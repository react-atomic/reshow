'use strict';
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin;
const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;
const ENV = process.env.NODE_ENV;
const json = process.env.CONFIG || '{}';
const confs = JSON.parse(json);

let plugins = [
    new CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js'
    }),
];
if ('production' === ENV) {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production'),
            '__DEVTOOLS__': false
          }
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
let vendor = ['react', 'react-dom', 'immutable'];
if (confs.webpackVendor) {
    vendor = vendor.concat(confs.webpackVendor);
}

const myWebpack = (root, main=null)=>
{
    if (!main) {
        main = './build/src/client.js';
    }

    let entry = {
        main: main,
        vendor: vendor
    };

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
            fs: "empty"
        },
        resolve: {
            extensions: ['.js','.jsx'],
            alias: {
                react: root + '/node_modules/react'
            }
        },
        resolveLoader: {
            modules: [root + '/node_modules']
        },
        module: {
            loaders: [
                  { 
                    test: /(.js|.jsx)$/, 
           //         exclude: /node_modules/,
                    loader: "babel-loader", 
                    query:{
                        cacheDirectory:true
                    } 
                  },
                  { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' }
            ]
        },
        plugins: plugins
    };
};

export default myWebpack;
