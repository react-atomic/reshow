'use strict';
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ENV = process.env.NODE_ENV;
let plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks:1}),
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
            compress: { warnings: false}
        }),
    ]);
}

const myWebpack = (root, main='./src/server.js')=>
{
    return {
        entry: {
           node: main,
        },
        output: {
            filename: "[name].bundle.js",
            path: root + "/assets"
        },
        node: {
            fs: "empty",
        },
        resolve: {
            extensions: ['','.js','.jsx']
        },
        resolveLoader: {
            root: root + '/node_modules'
        },
        module: {
            loaders: [
                  { 
                    test: /(.js|.jsx)$/, 
                    //exclude: /node_modules/,
                    loader: "babel-loader", 
                    query:{
                        cacheDirectory:true
                    } 
                  }
            ]
        },
        plugins: plugins
    };
};

export default myWebpack;
