import path from "path";
import webpack from "webpack";
import { getRefreshGlobalScope, refreshUtils } from "./globals";
import injectRefreshLoader from "./utils/injectRefreshLoader";
import injectRefreshEntry from "./utils/injectRefreshEntry";
import makeRefreshRuntimeModule from "./utils/makeRefreshRuntimeModule";

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
    this.options = Object.assign(defaultOptions, options);
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
      this.options
    );
    let loggedHotWarning = false;

    // Inject react-refresh context to all Webpack entry points
    compiler.options.entry = injectRefreshEntry(compiler.options.entry);

    // Inject refresh utilities to Webpack's global scope
    const providePlugin = new webpack.ProvidePlugin({
      [refreshUtils]: require.resolve("./runtime/utils"),
    });
    providePlugin.apply(compiler);

    compiler.hooks.beforeRun.tap(this.constructor.name, (compiler) => {
      // Check for existence of HotModuleReplacementPlugin in the plugin list
      // It is the foundation to this plugin working correctly
      if (
        !compiler.options.plugins.find(
          // It's validated with the name rather than the constructor reference
          // because a project might contain multiple references to Webpack
          (plugin) => plugin.constructor.name === "HotModuleReplacementPlugin"
        )
      ) {
        throw new Error(
          "Hot Module Replacement (HMR) is not enabled! React-refresh requires HMR to function properly."
        );
      }
    });

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
          normalModuleFactory
        );

        const refreshGlobal = getRefreshGlobalScope(
          webpack.RuntimeGlobals || {}
        );
        const ReactRefreshRuntimeModule = makeRefreshRuntimeModule(webpack);
        compilation.hooks.additionalTreeRuntimeRequirements.tap(
          this.constructor.name,
          // Setup react-refresh globals with a Webpack runtime module
          (chunk, runtimeRequirements) => {
            runtimeRequirements.add(
              webpack.RuntimeGlobals.interceptModuleExecution
            );
            runtimeRequirements.add(webpack.RuntimeGlobals.moduleCache);
            runtimeRequirements.add(refreshGlobal);
            compilation.addRuntimeModule(
              chunk,
              new ReactRefreshRuntimeModule()
            );
          }
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
          }
        );
        /*
        webpack.NormalModule.getCompilationHooks(compilation).loader.tap(
          // `Infinity` ensures this check will run only after all other taps
          { name: this.constructor.name, stage: Infinity },
          // Check for existence of the HMR runtime -
          // it is the foundation to this plugin working correctly
          (context) => {
            if (!context.hot && !loggedHotWarning) {
              console.warn(
                [
                  "Hot Module Replacement (HMR) is not enabled!",
                  "React Refresh requires HMR to function properly.",
                ].join(" ")
              );
              loggedHotWarning = true;
            }
          }
        );
        */
      }
    );
  }
}

export default ReactRefreshPlugin;
