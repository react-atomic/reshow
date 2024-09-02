// @ts-check
// https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/f1c8b9a44198449093ca95f85af5df97925e1cfc/lib/utils/injectRefreshLoader.js

import path from "path";
import { createRequire } from "node:module";
import { getDirName } from "../../util/getDirName";

/**
 * @typedef {Object} ESModuleOptions
 * @property {string | RegExp | Array<string | RegExp>} [exclude] Files to explicitly exclude from flagged as ES Modules.
 * @property {string | RegExp | Array<string | RegExp>} [include] Files to explicitly include for flagged as ES Modules.
 */

/**
 * @typedef {Object} ReactRefreshLoaderOptions
 * @property {boolean} [const] Enables usage of ES6 `const` and `let` in generated runtime code.
 * @property {boolean | ESModuleOptions} [esModule] Enables strict ES Modules compatible runtime.
 */

/**
 * @callback MatchObject
 * @param {string} [str]
 * @returns {boolean}
 */

/**
 * @typedef {Object} InjectLoaderOptions
 * @property {MatchObject} match A function to include/exclude files to be processed.
 * @property {ReactRefreshLoaderOptions} [options] Options passed to the loader.
 */

const rootDir = getDirName(); 
let myrequire;
if ("undefined" === typeof require) {
  // @ts-ignore
  myrequire = createRequire(import.meta.url);
} else {
  myrequire = require;
}

const resolvedLoader = path.join(rootDir, "../loader");
const reactRefreshPath = path.dirname(myrequire.resolve("react-refresh"));
const refreshUtilsPath = path.join(rootDir, "../runtime/RefreshUtils");

/**
 * @param {any} moduleData
 * @param {InjectLoaderOptions} injectOptions
 */
const injectRefreshLoader = (moduleData, injectOptions) => {
  const { match, options } = injectOptions;

  // Include and exclude user-specified files
  if (!match(moduleData.matchResource || moduleData.resource)) {
    return moduleData;
  }

  // Include and exclude dynamically generated modules from other loaders
  if (moduleData.matchResource && !match(moduleData.request)) {
    return moduleData;
  }

  // Exclude files referenced as assets
  if (moduleData.type.includes("asset")) {
    return moduleData;
  }

  // Check to prevent double injection
  if (moduleData.loaders.find(({ loader }) => loader === resolvedLoader)) {
    return moduleData;
  }

  // Skip react-refresh and the plugin's runtime utils to prevent self-referencing -
  // this is useful when using the plugin as a direct dependency,
  // or when node_modules are specified to be processed.
  if (
    moduleData.resource.includes(reactRefreshPath) ||
    moduleData.resource.includes(refreshUtilsPath)
  ) {
    return moduleData;
  }

  // As we inject runtime code for each module,
  // it is important to run the injected loader after everything.
  // This way we can ensure that all code-processing have been done,
  // and we won't risk breaking tools like Flow or ESLint.
  moduleData.loaders.unshift({
    loader: resolvedLoader,
    options,
  });

  return moduleData;
};
export default injectRefreshLoader;
