'use strict';
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const keys = Object.keys;
const assign = Object.assign;

const {
    CommonsChunkPlugin,
    UglifyJsPlugin,
    OccurrenceOrderPlugin,
    AggressiveMergingPlugin,
    ModuleConcatenationPlugin
} = webpack.optimize;
const {
    NODE_ENV,
    CONFIG,
    BUNDLE
} = process.env;
let confs = {};
if (CONFIG) {
    confs = JSON.parse(CONFIG);
}

let plugins = [
    new CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js'
    }),
];
if (BUNDLE) {
    let bundle = assign(
        {analyzerHost: '0.0.0.0'},
        JSON.parse(BUNDLE)
    );
    plugins = plugins.concat([
        new BundleAnalyzerPlugin(bundle),
    ]);
    if ('production' !== NODE_ENV) {
        plugins = plugins.concat([
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            }),
            new UglifyJsPlugin({
                compress: { 
                    unused: true,
                    dead_code: true,
                    join_vars: false,
                    pure_funcs: ['__webpack_require__', '__webpack_exports__'],
                    hoist_funs: true,
                    collapse_vars: true,
                    passes:2,
                    side_effects: true,
                },
                mangle: false,
                beautify: true,
                output: {
                    comments: true 
                },
            }),
        ]);
    }
}
if ('production' === NODE_ENV) {
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
            compress: { warnings: false},
            comments: false
        }),
        new OccurrenceOrderPlugin(),
        new AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        })
    ]);
}

/*vendor*/
const deduplicate = (arr) => {
    return Array.from(new Set(arr));
}
let vendor = ['react', 'react-dom', 'immutable'];
if (confs.webpackVendor) {
    vendor = vendor.concat(confs.webpackVendor);
}
vendor = deduplicate(vendor);

const myWebpack = (root, main=null)=>
{
    if (!main) {
        main = './build/src/client.js';
    }

    let entry = {
        main: main,
        vendor: vendor
    };

    let alias = {
        react: root + '/node_modules/react'
    };
    if (confs.alias) {
        keys(confs.alias).forEach(function(k){
            alias[k] = confs.alias[k];
        });
    }

    return  {
        //devtool: 'sourcemap',
        entry: entry,
        output: {
            filename: "[name].bundle.js",
            path: root+ "/assets",
            publicPath: confs.assetsRoot,
            chunkFilename: "[id].[hash].bundle.js"
        },
        node: {
            fs: "empty",
            setImmediate: false
        },
        externals: confs.externals,
        resolve: {
            extensions: ['.js','.jsx'],
            alias: alias
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
                    options:{
                        cacheDirectory: true,
                        plugins: [
                            'syntax-dynamic-import'
                        ]
                    } 
                  }
            ]
        },
        plugins: plugins
    };
};

module.exports=myWebpack;
