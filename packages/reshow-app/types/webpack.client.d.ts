export default myWebpack;
/**
 * @param {string} root
 * @param {Object<string,string>} main
 * @param {Object<any, any>} lazyConfs
 */
declare function myWebpack(root: string, main: {
    [x: string]: string;
}, lazyConfs: any): {
    mode: string;
    devtool: string | boolean;
    entry: {};
    output: {
        filename: string;
        path: string;
        publicPath: any;
    };
    optimization: {
        chunkIds: string;
        moduleIds: string;
        usedExports: string;
        removeAvailableModules: boolean;
    };
    plugins: any[];
    module: {
        rules: {
            oneOf: ({
                resourceQuery: RegExp;
                type: string;
                test?: undefined;
                exclude?: undefined;
                use?: undefined;
            } | {
                test: RegExp;
                exclude: RegExp[];
                use: {
                    loader: string;
                };
                resourceQuery?: undefined;
                type?: undefined;
            })[];
        }[];
    };
    resolve: {
        symlinks: boolean;
        extensions: string[];
        fallback: any;
        alias: any;
    };
    resolveLoader: {
        modules: string[];
    };
    externals: any;
    devServer: any;
    cache: {
        type: string;
        allowCollectingMemory: boolean;
    };
} | {
    mode: string;
    devtool: string | boolean;
    entry: {};
    output: {
        filename: string;
        path: string;
        publicPath: any;
    };
    optimization: {
        chunkIds: string;
        moduleIds: string;
        usedExports: string;
        removeAvailableModules: boolean;
    };
    plugins: any[];
    module: {
        rules: {
            oneOf: ({
                resourceQuery: RegExp;
                type: string;
                test?: undefined;
                exclude?: undefined;
                use?: undefined;
            } | {
                test: RegExp;
                exclude: RegExp[];
                use: {
                    loader: string;
                };
                resourceQuery?: undefined;
                type?: undefined;
            })[];
        }[];
    };
    resolve: {
        symlinks: boolean;
        extensions: string[];
        fallback: any;
        alias: any;
    };
    resolveLoader: {
        modules: string[];
    };
    externals: any;
    devServer: any;
    cache?: undefined;
};
