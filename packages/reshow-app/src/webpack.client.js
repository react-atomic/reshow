'use strict';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import BundleTracker from './webpackBundleTracker'; 
import ora from 'ora';
const spinner = ora({text:'Trust me, it will finish soon.', spinner: 'line'}).start();

let spinnerTime = setTimeout(()=>{
    spinner.text = 'If you don\'t trust me, trust yourself.';
    spinnerTime = setTimeout(()=>{
        spinner.text = 'If you don\'t trust yourself, Just wait until you see the finished.';
    }, 5000);
}, 5000);

const keys = Object.keys;

const {
    CommonsChunkPlugin,
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
let plugins = []
let babelLoaderOption = {
    cacheDirectory: true,
    plugins: [
        'syntax-dynamic-import'
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
            comments: true,
            beautify: true,
        },
    }
};

/*vendor*/
const deduplicate = arr => Array.from(new Set(arr))
let vendor = ['react', 'react-dom', 'immutable'];
if (confs.resetVendor) {
    vendor = confs.resetVendor
}
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
                new UglifyJsPlugin(uglifyJsOptions),
            ]);
        }
    }
    if ('production' === NODE_ENV) {
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
                debug: false
            }),
            new UglifyJsPlugin({
                ...uglifyJsOptions,
                uglifyOptions: {
                    ...uglifyJsOptions.uglifyOptions,
                    output: {
                        comments: false,
                        beautify: false,
                    },
                }
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

    const entry = main
    if (vendor && vendor.length) {
      entry.vendor = vendor
      plugins = plugins.concat([
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
      ])
    }
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
        devtool,
        entry,
        output: {
            filename: "[name].bundle.js",
            path,
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
            alias
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
        plugins
    };
};

module.exports=myWebpack;
