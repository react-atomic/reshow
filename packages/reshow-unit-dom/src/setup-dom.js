// @ts-nocheck
import { Window, GlobalWindow } from "happy-dom";
import * as PropertySymbol from "happy-dom/lib/PropertySymbol.js";

// Preload-style global DOM setup (runs on import)
const __preloadWindow = new Window();
globalThis.window = __preloadWindow;
globalThis.document = __preloadWindow.document;
Object.defineProperty(globalThis, "navigator", {
  value: __preloadWindow.navigator,
  writable: true,
  configurable: true,
});
globalThis.HTMLElement = __preloadWindow.HTMLElement;
globalThis.Node = __preloadWindow.Node;

// jsdom implementation
export const jsdomWrapper = { current: null };

const IGNORE_LIST = ["constructor", "undefined", "NaN", "global", "globalThis"];

/**
 * @typedef {Object} JsdomBrowserSettings
 * @property {boolean} [disableJavaScriptEvaluation]
 * @property {boolean} [enableJavaScriptEvaluation]
 * @property {boolean} [disableJavaScriptFileLoading]
 * @property {boolean} [disableCSSFileLoading]
 * @property {boolean} [enableCSSFileLoading]
 * @property {boolean} [enableImageFileLoading]
 * @property {boolean} [disableIframePageLoading]
 * @property {boolean} [enableIframePageLoading]
 * @property {boolean} [disableComputedStyleRendering]
 * @property {boolean} [handleDisabledFileLoadingAsSuccess]
 * @property {boolean} [disableErrorCapturing]
 * @property {string} [errorCapture]
 * @property {boolean} [enableFileSystemHttpRequests]
 * @property {boolean} [suppressCodeGenerationFromStringsWarning]
 * @property {boolean} [suppressInsecureJavaScriptEnvironmentWarning]
 * @property {{ maxTimeout?: number; maxIntervalTime?: number; maxIntervalIterations?: number; preventTimerLoops?: boolean }} [timer]
 * @property {{ disableSameOriginPolicy?: boolean; disableStrictSSL?: boolean; interceptor?: ((...args: unknown[]) => unknown) | null; requestHeaders?: Record<string, string> | null; virtualServers?: unknown }} [fetch]
 * @property {{ resolveNodeModules?: unknown; urlResolver?: unknown; disableCache?: boolean }} [module]
 * @property {{ disableMainFrameNavigation?: boolean; disableChildFrameNavigation?: boolean; disableChildPageNavigation?: boolean; disableFallbackToSetURL?: boolean; crossOriginPolicy?: string; beforeContentCallback?: ((...args: unknown[]) => unknown) | null }} [navigation]
 * @property {{ userAgent?: string; maxTouchPoints?: number }} [navigator]
 * @property {{ prefersColorScheme?: string; prefersReducedMotion?: string; mediaType?: string; forcedColors?: string }} [device]
 * @property {{ traceWaitUntilComplete?: number }} [debug]
 * @property {{ width?: number; height?: number; devicePixelRatio?: number }} [viewport]
 * @property {unknown} [canvasAdapter]
 *
 * @typedef {Object} JsdomOptions
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [innerWidth]
 * @property {number} [innerHeight]
 * @property {string} [url]
 * @property {Console} [console]
 * @property {JsdomBrowserSettings} [settings]
 *
 * @param {string | null} [html]
 * @param {JsdomOptions} [options]
 * @returns {(() => void) & { window: any; registered: Record<string | symbol, PropertyDescriptor | null> }}
 */
export const jsdom = (html = null, options = {}) => {
  const cleanup = () => {
    const registered = cleanup.registered;
    const window = cleanup.window;
    if (registered) {
      for (const key of Object.keys(registered)) {
        if (registered[key] !== null) {
          Object.defineProperty(globalThis, key, registered[key]);
        } else {
          delete globalThis[key];
        }
      }
    }
    try {
      window?.happyDOM?.close();
    } catch (e) {
      /* ignore */
    }
  };

  const window = new GlobalWindow({ ...options, console: globalThis.console });
  if (html) {
    window.document.write(html);
    window.document.close();
  }

  const registered = {};
  const propertyDescriptors = Object.getOwnPropertyDescriptors(window);
  for (const key of Object.keys(propertyDescriptors)) {
    if (!IGNORE_LIST.includes(key)) {
      const windowPropertyDescriptor = propertyDescriptors[key];
      const globalPropertyDescriptor = Object.getOwnPropertyDescriptor(globalThis, key);
      if (
        globalPropertyDescriptor?.value === undefined ||
        globalPropertyDescriptor?.value !== windowPropertyDescriptor.value
      ) {
        registered[key] = globalPropertyDescriptor || null;
        if (windowPropertyDescriptor.value === window) {
          window[key] = globalThis;
          windowPropertyDescriptor.value = globalThis;
        }
        Object.defineProperty(globalThis, key, {
          ...windowPropertyDescriptor,
          configurable: true,
        });
      }
    }
  }
  const propertySymbols = Object.getOwnPropertySymbols(window);
  for (const key of propertySymbols) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(window, key);
    registered[key] = null;
    if (propertyDescriptor.value === window) {
      window[key] = globalThis;
      propertyDescriptor.value = globalThis;
    }
    Object.defineProperty(globalThis, key, {
      ...propertyDescriptor,
      configurable: true,
    });
  }
  try {
    globalThis.document[PropertySymbol.defaultView] = globalThis;
  } catch (e) {
    /* ignore */
  }

  cleanup.window = window;
  cleanup.registered = registered;
  jsdomWrapper.current = cleanup;
  return cleanup;
};
