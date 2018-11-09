'use strict';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const {
    OccurrenceOrderPlugin,
    ModuleConcatenationPlugin,
    LimitChunkCountPlugin
} = webpack.optimize;
const {
    NODE_ENV,
    CONFIG
} = process.env;
let confs = {};
if (CONFIG) {
    confs = JSON.parse(CONFIG);
}

let plugins = [
    new LimitChunkCountPlugin({maxChunks:1}),
];
let babelLoaderOption = {
    cacheDirectory: true,
    plugins: [
        '@babel/plugin-syntax-dynamic-import'
    ]
};

/* Default uglifyJs options */
const uglifyJsOptions = {
    cache: true,
    parallel: true, 
    uglifyOptions: {
        compress: { 
            unused: true,
            dead_code: true,
            join_vars: false,
            hoist_funs: true,
            collapse_vars: true,
            passes:2,
            side_effects: true,
            warnings: false,
        },
        mangle: false,
        output: {
            comments: false,
            beautify: false,
        },
    }
};

const myWebpack = (root, entry, lazyConfs)=>
{
    confs = {...confs, ...lazyConfs};
    if ('production' === NODE_ENV) {
        babelLoaderOption.envName = 'production';
        plugins = plugins.concat([
            new webpack.DefinePlugin({
              'process.env':{
                'NODE_ENV': JSON.stringify('production'),
                '__DEVTOOLS__': false
              }
            }),
            new ModuleConcatenationPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            }),
            new UglifyJsPlugin(uglifyJsOptions),
            new OccurrenceOrderPlugin(),
        ]);
    }
    if (!entry) {
        entry = {
            node: './build/src/server.js'
        };
    }
    return {
        entry,
        output: {
            filename: "[name].bundle.js",
            path: root + "/assets"
        },
        node: {
            fs: "empty",
            setImmediate: false
        },
        externals: confs.externals,
        resolve: {
            extensions: ['.mjs', '.js','.jsx'],
            alias: confs.alias
        },
        resolveLoader: {
            modules: [root + '/node_modules']
        },
        module: {
            loaders: [
                  { 
                    test: /(.js|.jsx)$/, 
                    exclude: /node_modules/,
                    loader: "babel-loader", 
                    options: babelLoaderOption 
                  }
            ]
        },
        plugins: plugins
    };
};

module.exports=myWebpack;
