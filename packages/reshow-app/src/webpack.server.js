'use strict';
const webpack = require('webpack');

const {
    UglifyJsPlugin,
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
        'syntax-dynamic-import'
    ]
};


const myWebpack = (root, entry, lazyConfs)=>
{
    confs = {...confs, ...lazyConfs};
    if ('production' === NODE_ENV) {
        babelLoaderOption.env = 'production';
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
            new UglifyJsPlugin({
                compress: {
                    unused: true,
                    dead_code: true,
                    warnings: false
                },
                comments: false
            }),
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
            extensions: ['.js','.jsx'],
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
