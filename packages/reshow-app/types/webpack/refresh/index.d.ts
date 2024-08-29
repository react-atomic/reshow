export default ReactRefreshPlugin;
export type ReactRefreshPluginOptions = {
    /**
     * Enables the plugin forcefully.
     */
    forceEnable?: boolean;
};
declare class ReactRefreshPlugin {
    /**
     * @param {ReactRefreshPluginOptions} [options] Options for react-refresh-plugin.
     * @returns {void}
     */
    constructor(options?: ReactRefreshPluginOptions);
    options: {
        /**
         * Enables the plugin forcefully.
         */
        forceEnable?: boolean;
    };
    /**
     * Applies the plugin
     * @param {import('webpack').Compiler} compiler A webpack compiler object.
     * @returns {void}
     */
    apply(compiler: import("webpack").Compiler): void;
}
