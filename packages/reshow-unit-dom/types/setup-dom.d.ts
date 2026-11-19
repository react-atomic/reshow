export declare const jsdomWrapper: {
    current: null;
};
export type JsdomBrowserSettings = {
    disableJavaScriptEvaluation?: boolean;
    enableJavaScriptEvaluation?: boolean;
    disableJavaScriptFileLoading?: boolean;
    disableCSSFileLoading?: boolean;
    enableCSSFileLoading?: boolean;
    enableImageFileLoading?: boolean;
    disableIframePageLoading?: boolean;
    enableIframePageLoading?: boolean;
    disableComputedStyleRendering?: boolean;
    handleDisabledFileLoadingAsSuccess?: boolean;
    disableErrorCapturing?: boolean;
    errorCapture?: string;
    enableFileSystemHttpRequests?: boolean;
    suppressCodeGenerationFromStringsWarning?: boolean;
    suppressInsecureJavaScriptEnvironmentWarning?: boolean;
    timer?: {
        maxTimeout?: number;
        maxIntervalTime?: number;
        maxIntervalIterations?: number;
        preventTimerLoops?: boolean;
    };
    fetch?: {
        disableSameOriginPolicy?: boolean;
        disableStrictSSL?: boolean;
        interceptor?: ((...args: unknown[]) => unknown) | null;
        requestHeaders?: Record<string, string> | null;
        virtualServers?: unknown;
    };
    module?: {
        resolveNodeModules?: unknown;
        urlResolver?: unknown;
        disableCache?: boolean;
    };
    navigation?: {
        disableMainFrameNavigation?: boolean;
        disableChildFrameNavigation?: boolean;
        disableChildPageNavigation?: boolean;
        disableFallbackToSetURL?: boolean;
        crossOriginPolicy?: string;
        beforeContentCallback?: ((...args: unknown[]) => unknown) | null;
    };
    navigator?: {
        userAgent?: string;
        maxTouchPoints?: number;
    };
    device?: {
        prefersColorScheme?: string;
        prefersReducedMotion?: string;
        mediaType?: string;
        forcedColors?: string;
    };
    debug?: {
        traceWaitUntilComplete?: number;
    };
    viewport?: {
        width?: number;
        height?: number;
        devicePixelRatio?: number;
    };
    canvasAdapter?: unknown;
};
export type JsdomOptions = {
    width?: number;
    height?: number;
    innerWidth?: number;
    innerHeight?: number;
    url?: string;
    console?: Console;
    settings?: JsdomBrowserSettings;
};
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
export declare const jsdom: (html?: string | null, options?: JsdomOptions) => (() => void) & {
    window: any;
    registered: Record<string | symbol, PropertyDescriptor | null>;
};
