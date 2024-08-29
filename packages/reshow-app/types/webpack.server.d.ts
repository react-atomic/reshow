export default myWebpack;
declare function myWebpack(root: any, main: any, lazyConfs: any): {
    mode: string;
    devtool: boolean;
    entry: {};
    externals: any;
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
    cache: {
        type: string;
        allowCollectingMemory: boolean;
    };
} | {
    mode: string;
    devtool: boolean;
    entry: {};
    externals: any;
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
    cache?: undefined;
};
