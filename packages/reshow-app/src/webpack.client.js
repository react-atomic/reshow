'use strict';
import webpack from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import BundleTracker from './webpackBundleTracker'; 
import ora from 'ora';
const spinner = ora({text:'Trust me, it will finish soon.', spinner: 'line'}).start();

let spinnerTime = setTimeout(()=>{
    spinner.text = 'If you don\'t trust me, trust yourself.';
    spinnerTime = setTimeout(()=>{
        spinner.text = 'If you don\'t trust yourself, Just wait until you see the finished.';
    }, 10000);
}, 10000);

const keys = Object.keys;

const {
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

let devtool = 'cheap-source-map';
let plugins = [];
let babelLoaderOption = {
    cacheDirectory: true,
    plugins: [
        'syntax-dynamic-import'
    ]
};
let mode = 'development';

/* Default uglifyJs options */
const uglifyJsOptions = {
    cache: true,
    parallel: true, 
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
        comments: true,
        beautify: true,
    },
};

/*vendor*/
const deduplicate = (arr) => {
    return Array.from(new Set(arr));
}
let vendor = ['react', 'react-dom', 'immutable'];
if (confs.webpackVendor) {
    vendor = vendor.concat(confs.webpackVendor);
}
vendor = deduplicate(vendor);

const myWebpack = (root, main, lazyConfs)=>
{
    confs = {...confs, ...lazyConfs};
    if (BUNDLE) {
        let bundle = {
            analyzerHost: '0.0.0.0',
            ...JSON.parse(BUNDLE)
        };
        plugins = plugins.concat([
            new BundleAnalyzerPlugin(bundle),
        ]);
        if ('production' !== NODE_ENV) {
            plugins = plugins.concat([
                new webpack.LoaderOptionsPlugin({
                    minimize: true,
                }),
            ]);
        }
    }
    if ('production' === NODE_ENV) {
        mode='production';
        devtool = false;
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
            new OccurrenceOrderPlugin(),
            new AggressiveMergingPlugin({
                minSizeReduce: 1.5,
                moveToParents: true
            })
        ]);
    }
    const path = root+ "/assets";
    if (!main) {
        main = { main: './build/src/client.js' };
    }

    let entry = {
        ...main
    };
    plugins = plugins.concat([
        new BundleTracker({
            path,
            filename: './stats.json',
            callback: ()=>{
                clearTimeout(spinnerTime);
                spinner.stop();    
            }
        })
    ]);

    const alias = {
        react: root + '/node_modules/react'
    };
    if (confs.alias) {
        keys(confs.alias).forEach(function(k){
            alias[k] = confs.alias[k];
        });
    }

    return {
        mode,
        devtool,
        entry,
	optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                            chunks: "initial",
                            minChunks: 2,
                            maxInitialRequests: 5, // The default limit is too small to showcase the effect
                            minSize: 0 // This is example is too small to create commons chunks
                    },
                    vendor: {
                            test: /node_modules/,
                            chunks: "initial",
                            name: "vendor",
                            priority: 10,
                            enforce: true
                    }
                }
            },
            occurrenceOrder: true
	},
        output: {
            filename: "[name].bundle.js",
            path,
            publicPath: confs.assetsRoot,
//            chunkFilename: "[id].[hash].bundle.js"
        },
        node: {
            fs: "empty",
            setImmediate: false
        },
        externals: confs.externals,
        resolve: {
            extensions: ['.js','.jsx'],
            alias
        },
        resolveLoader: {
            modules: [root + '/node_modules']
        },
        module: {
            rules: [
                  { 
                    test: /(.js|.jsx)$/, 
                    exclude: /node_modules/,
                    loader: "babel-loader", 
                    options: babelLoaderOption
                  }
            ]
        },
        plugins
    };
};

module.exports=myWebpack;
