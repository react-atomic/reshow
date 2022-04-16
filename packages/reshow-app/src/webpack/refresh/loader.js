import fs from "fs";
import { refreshUtils } from "./globals";
import RefreshModuleRuntime from "./runtime/RefreshModuleRuntime";
import isUseEsm from "./utils/isUseEsm";

const toRefreshUtils = (o) =>
  o.trim().replace(/\$RefreshUtils\$/g, refreshUtils);

const RefreshModuleRuntimeString = {
  cjs: toRefreshUtils(RefreshModuleRuntime()),
  esm: toRefreshUtils(RefreshModuleRuntime(true)),
};

/** A token to match code statements similar to a React import. */
const reactModule = /['"]react['"]|jsx/;

/**
 * A simple Webpack loader to inject react-refresh HMR code into modules.
 *
 * [Reference for Loader API](https://webpack.js.org/api/loaders/)
 * @param {string} source The original module source code.
 * @param {*} [inputSourceMap] The source map of the module.
 * @property {function(string): void} addDependency Adds a dependency for Webpack to watch.
 * @property {function(Error | null, string | Buffer, *?, *?): void} callback Sends loader results to Webpack.
 * @returns {string} The injected module source code.
 */
function RefreshHotLoader(source, inputSourceMap) {
  const type = isUseEsm(this.resourcePath, this.rootContext) ? "esm" : "cjs";

  // Use callback to allow source maps to pass through
  this.callback(
    null,
    // Only apply transform if the source code contains a React import
    reactModule.test(source)
      ? source + "\n\n" + RefreshModuleRuntimeString[type]
      : source,
    inputSourceMap
  );
}

export default RefreshHotLoader;
