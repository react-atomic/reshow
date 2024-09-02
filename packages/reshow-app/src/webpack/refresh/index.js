import webpack from "webpack";
import { getRefreshGlobalScope, refreshUtils } from "./globals";
import injectRefreshLoader from "./utils/injectRefreshLoader";
import injectRefreshEntry from "./utils/injectRefreshEntry";
import makeRefreshRuntimeModule from "./utils/makeRefreshRuntimeModule";
import { getDirName } from "../util/getDirName";

const root = getDirName();

/**
 * @typedef {Object} ReactRefreshPluginOptions
 * @property {boolean} [forceEnable] Enables the plugin forcefully.
 */

/** @type {ReactRefreshPluginOptions} */
const defaultOptions = {
  forceEnable: false,
};

class ReactRefreshPlugin {
  /**
   * @param {ReactRefreshPluginOptions} [options] Options for react-refresh-plugin.
   * @returns {void}
   */
  constructor(options) {
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Applies the plugin
   * @param {import('webpack').Compiler} compiler A webpack compiler object.
   * @returns {void}
   */
  apply(compiler) {
    // Skip processing on non-development mode, but allow manual force-enabling
    if (
      // Webpack do not set process.env.NODE_ENV, so we need to check for mode.
      // Ref: https://github.com/webpack/webpack/issues/7074
      (compiler.options.mode !== "development" ||
        // We also check for production process.env.NODE_ENV,
        // in case it was set and mode is non-development (e.g. 'none')
        (process.env.NODE_ENV && process.env.NODE_ENV === "production")) &&
      !this.options.forceEnable
    ) {
      return;
    }
    const match = webpack.ModuleFilenameHelpers.matchObject.bind(
      undefined,
      this.options,
    );

    // Inject react-refresh context to all Webpack entry points
    compiler.options.entry = injectRefreshEntry(compiler.options.entry);

    // Inject refresh utilities to Webpack's global scope
    const providePlugin = new webpack.ProvidePlugin({
      [refreshUtils]: `${root}/runtime/utils`,
    });
    providePlugin.apply(compiler);

    compiler.hooks.compilation.tap(
      this.constructor.name,
      (compilation, { normalModuleFactory }) => {
        // Only hook into the current compiler
        if (compilation.compiler !== compiler) {
          return;
        }

        // Set factory for EntryDependency which is used to initialise the module
        compilation.dependencyFactories.set(
          webpack.EntryDependency,
          normalModuleFactory,
        );

        const refreshGlobal = getRefreshGlobalScope(
          webpack.RuntimeGlobals || {},
        );
        const ReactRefreshRuntimeModule = makeRefreshRuntimeModule(webpack);
        compilation.hooks.additionalTreeRuntimeRequirements.tap(
          this.constructor.name,
          // Setup react-refresh globals with a Webpack runtime module
          (chunk, runtimeRequirements) => {
            runtimeRequirements.add(
              webpack.RuntimeGlobals.interceptModuleExecution,
            );
            runtimeRequirements.add(webpack.RuntimeGlobals.moduleCache);
            runtimeRequirements.add(refreshGlobal);
            compilation.addRuntimeModule(
              chunk,
              new ReactRefreshRuntimeModule(),
            );
          },
        );

        normalModuleFactory.hooks.afterResolve.tap(
          this.constructor.name,
          // Add react-refresh loader to process files that matches specified criteria
          (resolveData) => {
            injectRefreshLoader(resolveData.createData, {
              match,
              options: {
                const: compilation.runtimeTemplate.supportsConst(),
                esModule: this.options.esModule,
              },
            });
          },
        );
      },
    );
  }
}

export default ReactRefreshPlugin;
