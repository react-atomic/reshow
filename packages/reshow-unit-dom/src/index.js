// @ts-nocheck
import { GlobalWindow } from "happy-dom";
import * as PropertySymbol from "happy-dom/lib/PropertySymbol.js";
import sinon from "sinon";
import { FUNCTION } from "reshow-constant";

const jsdomWrapper = { current: null };
const consoleErrorWrapper = { current: null };
const consoleWarnWrapper = { current: null };
const sinonWrapper = { current: null };

const IGNORE_LIST = ["constructor", "undefined", "NaN", "global", "globalThis"];

const jsdom = (html, options) => {
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

const hideConsoleError = (toThrow) => {
  if (!consoleErrorWrapper.current) {
    consoleErrorWrapper.current = console.error;
    console.error = () => {};
  }
  if (true === toThrow) {
    console.error = (p) => {
      throw p;
    };
  } else if (FUNCTION === typeof toThrow) {
    console.error = toThrow;
  }
};

const hideConsoleWarn = (toThrow) => {
  if (!consoleWarnWrapper.current) {
    consoleWarnWrapper.current = console.warn;
    console.warn = () => {};
  }
  if (true === toThrow) {
    console.warn = (p) => {
      throw p;
    };
  } else if (FUNCTION === typeof toThrow) {
    console.warn = toThrow;
  }
};

const getSinon = (options) => {
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
    sinonWrapper.current = null;
  }
  sinonWrapper.current = sinon.createSandbox(options);
  return sinonWrapper.current;
};

const cleanIt = (props) => {
  const { debug } = props || {};
  if (consoleErrorWrapper.current) {
    console.error = consoleErrorWrapper.current;
    consoleErrorWrapper.current = null;
  }
  if (consoleWarnWrapper.current) {
    console.warn = consoleWarnWrapper.current;
    consoleWarnWrapper.current = null;
  }
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
    jsdomWrapper.current = jsdom();
  }
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
    sinonWrapper.current = null;
  }
  if (debug) {
    console.log({ debug });
  }
};

const sleep = (cb, delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      cb && cb();
      resolve(null);
    }, delay);
  });

export { cleanIt, jsdom, hideConsoleError, hideConsoleWarn, getSinon, sleep };
