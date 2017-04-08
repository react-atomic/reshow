'use strict';
const webpack = require('webpack');
const externals = require('./webpack.externals');

const {
    CommonsChunkPlugin,
    UglifyJsPlugin,
    OccurrenceOrderPlugin,
    AggressiveMergingPlugin
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
    new CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js'
    }),
];
if ('production' === NODE_ENV) {
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
        externals: externals,
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
                    exclude: /node_modules/,
                    loader: "babel-loader", 
                    options:{
                        cacheDirectory:true
                    } 
                  }
            ]
        },
        plugins: plugins
    };
};

module.exports=myWebpack;
