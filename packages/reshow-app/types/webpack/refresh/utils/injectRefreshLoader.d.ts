export default injectRefreshLoader;
export type ESModuleOptions = {
    /**
     * Files to explicitly exclude from flagged as ES Modules.
     */
    exclude?: string | RegExp | Array<string | RegExp>;
    /**
     * Files to explicitly include for flagged as ES Modules.
     */
    include?: string | RegExp | Array<string | RegExp>;
};
export type ReactRefreshLoaderOptions = {
    /**
     * Enables usage of ES6 `const` and `let` in generated runtime code.
     */
    const?: boolean;
    /**
     * Enables strict ES Modules compatible runtime.
     */
    esModule?: boolean | ESModuleOptions;
};
export type MatchObject = (str?: string) => boolean;
export type InjectLoaderOptions = {
    /**
     * A function to include/exclude files to be processed.
     */
    match: MatchObject;
    /**
     * Options passed to the loader.
     */
    options?: ReactRefreshLoaderOptions;
};
/**
 * @param {any} moduleData
 * @param {InjectLoaderOptions} injectOptions
 */
declare function injectRefreshLoader(moduleData: any, injectOptions: InjectLoaderOptions): any;
