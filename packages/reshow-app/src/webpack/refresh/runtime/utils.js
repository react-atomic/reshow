const Refresh = require("react-refresh/runtime");
const ErrorOverlay = require("../overlay/index");

/**
 * Extracts exports from a webpack module object.
 * @param {*} module A Webpack module object.
 * @returns {*} An exports object from the module.
 */
function getModuleExports(moduleId) {
  if (typeof moduleId === "undefined") {
    // `moduleId` is unavailable, which indicates that this module is not in the cache,
    // which means we won't be able to capture any exports,
    // and thus they cannot be refreshed safely.
    // These are likely runtime or dynamically generated modules.
    return {};
  }

  const maybeModule = __webpack_require__.c[moduleId];
  if (typeof maybeModule === "undefined") {
    // `moduleId` is available but the module in cache is unavailable,
    // which indicates the module is somehow corrupted (e.g. broken Webpacak `module` globals).
    // We will warn the user (as this is likely a mistake) and assume they cannot be refreshed.
    console.warn(
      "[React Refresh] Failed to get exports for module: " + moduleId + "."
    );
    return {};
  }

  var exportsOrPromise = maybeModule.exports;
  if (typeof Promise !== "undefined" && exportsOrPromise instanceof Promise) {
    return exportsOrPromise.then(function (exports) {
      return exports;
    });
  }
  return exportsOrPromise;
}

/**
 * Calculates the signature of a React refresh boundary.
 * If this signature changes, it's unsafe to accept the boundary.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L795-L816).
 */
function getReactRefreshBoundarySignature(moduleExports) {
  const signature = [];
  signature.push(Refresh.getFamilyByType(moduleExports));

  if (moduleExports == null || typeof moduleExports !== "object") {
    // Exit if we can't iterate over exports.
    return signature;
  }

  for (const key in moduleExports) {
    if (key === "__esModule") {
      continue;
    }

    signature.push(key);
    signature.push(Refresh.getFamilyByType(moduleExports[key]));
  }

  return signature;
}

/**
 * Creates a helper that performs a delayed React refresh.
 * @returns {enqueueUpdate} A debounced React refresh function.
 */
function createDebounceUpdate() {
  /**
   * A cached setTimeout handler.
   * @type {number | void}
   */
  let refreshTimeout = undefined;

  /**
   * Performs react refresh on a delay and clears the error overlay.
   * @returns {void}
   */
  function enqueueUpdate() {
    if (refreshTimeout === undefined) {
      refreshTimeout = setTimeout(function () {
        refreshTimeout = undefined;
        Refresh.performReactRefresh();
        ErrorOverlay.clearRuntimeErrors();
      }, 30);
    }
  }

  return enqueueUpdate;
}

/**
 * Checks if all exports are likely a React component.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L748-L774).
 * @param {*} module A Webpack module object.
 * @returns {boolean} Whether the exports are React component like.
 */
function isReactRefreshBoundary(moduleExports) {
  if (Refresh.isLikelyComponentType(moduleExports)) {
    return true;
  }

  if (
    moduleExports === undefined ||
    moduleExports === null ||
    typeof moduleExports !== "object"
  ) {
    // Exit if we can't iterate over exports.
    return false;
  }
  let hasExports = false;
  let areAllExportsComponents = true;
  for (let key in moduleExports) {
    hasExports = true;

    // This is the ES Module indicator flag
    if (key === "__esModule") {
      continue;
    }

    // We can (and have to) safely execute getters here,
    // as Webpack manually assigns harmony exports to getters,
    // without any side-effects attached.
    // Ref: https://github.com/webpack/webpack/blob/b93048643fe74de2a6931755911da1212df55897/lib/MainTemplate.js#L281
    const exportValue = moduleExports[key];
    if (!Refresh.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }

  return hasExports && areAllExportsComponents;
}

/**
 * Checks if exports are likely a React component and registers them.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/febdba2383113c88296c61e28e4ef6a7f4939fda/packages/metro/src/lib/polyfills/require.js#L818-L835).
 * @param {*} module A Webpack module object.
 * @returns {void}
 */
function registerExportsForReactRefresh(moduleExports, moduleId) {
  if (Refresh.isLikelyComponentType(moduleExports)) {
    // Register module.exports if it is likely a component
    Refresh.register(moduleExports, moduleId + " %exports%");
  }

  if (
    moduleExports === undefined ||
    moduleExports === null ||
    typeof moduleExports !== "object"
  ) {
    // Exit if we can't iterate over the exports.
    return;
  }

  for (let key in moduleExports) {
    // Skip registering the ES Module indicator
    if (key === "__esModule") {
      continue;
    }

    const exportValue = moduleExports[key];
    if (Refresh.isLikelyComponentType(exportValue)) {
      const typeID = moduleId + " %exports% " + key;
      Refresh.register(exportValue, typeID);
    }
  }
}

/**
 * Compares previous and next module objects to check for mutated boundaries.
 *
 * This implementation is based on the one in [Metro](https://github.com/facebook/metro/blob/907d6af22ac6ebe58572be418e9253a90665ecbd/packages/metro/src/lib/polyfills/require.js#L776-L792).
 */
function shouldInvalidateReactRefreshBoundary(prevExports, nextExports) {
  const prevSignature = getReactRefreshBoundarySignature(prevExports);
  const nextSignature = getReactRefreshBoundarySignature(nextExports);

  if (prevSignature.length !== nextSignature.length) {
    return true;
  }

  for (let i = 0, j = nextSignature.length; i < j; i++) {
    if (prevSignature[i] !== nextSignature[i]) {
      return true;
    }
  }

  return false;
}

const enqueueUpdate = createDebounceUpdate();
function executeRuntime(
  moduleExports,
  moduleId,
  webpackHot,
  refreshOverlay,
  isTest
) {
  registerExportsForReactRefresh(moduleExports, moduleId);
  if (webpackHot) {
    const isHotUpdate = !!webpackHot.data;
    let prevExports;
    if (isHotUpdate) {
      prevExports = webpackHot.data.prevExports;
    }
    if (isReactRefreshBoundary(moduleExports)) {
      webpackHot.dispose(
        /**
         * A callback to performs a full refresh if React has unrecoverable errors,
         * and also caches the to-be-disposed module.
         * @param {*} data A hot module data object from Webpack HMR.
         * @returns {void}
         */
        function hotDisposeCallback(data) {
          // We have to mutate the data object to get data registered and cached
          data.prevExports = moduleExports;
        }
      );
      webpackHot.accept(
        /**
         * An error handler to allow self-recovering behaviours.
         * @param {Error} error An error occurred during evaluation of a module.
         * @returns {void}
         */
        function hotErrorHandler(error) {
          if (typeof refreshOverlay !== "undefined" && refreshOverlay) {
            refreshOverlay.handleRuntimeError(error);
          }
          if (typeof isTest !== "undefined" && isTest) {
            if (window.onHotAcceptError) {
              window.onHotAcceptError(error.message);
            }
          }
          __webpack_require__.c[moduleId].hot.accept(hotErrorHandler);
        }
      );

      if (isHotUpdate) {
        if (
          isReactRefreshBoundary(prevExports) &&
          shouldInvalidateReactRefreshBoundary(prevExports, moduleExports)
        ) {
          /*Need force update*/
          webpackHot.invalidate();
        } else {
          enqueueUpdate(function updateCallback() {
            if (typeof refreshOverlay !== "undefined" && refreshOverlay) {
              refreshOverlay.clearRuntimeErrors();
            }
          });
        }
      }
    }
  }
}

export default Object.freeze({
  enqueueUpdate,
  executeRuntime,
  getModuleExports,
  isReactRefreshBoundary,
  shouldInvalidateReactRefreshBoundary,
  registerExportsForReactRefresh,
});
