import webpack from 'webpack';
import moduleAlias from 'module-alias';
import getResolve, {getResolveLoader, getNode} from './webpack/getResolve';
import getEntry from './webpack/getEntry';
import getOptimization from './webpack/getOptimization';
import getModule from './webpack/getModule';
import getPlugins from './webpack/getPlugins';
import getOutput from './webpack/getOutput';
import {DEVELOPMENT, PRODUCTION} from './webpack/const';
import progress from './webpack/progress';

const {NODE_ENV, CONFIG, BUNDLE} = process.env;
let confs = CONFIG ? JSON.parse(CONFIG) : {};

const myWebpack = (root, main, lazyConfs) => {
  confs = {...confs, ...lazyConfs};
  const stop = progress({confs});
  const path = root + '/assets';
  let mode = DEVELOPMENT;
  if (PRODUCTION === NODE_ENV) {
    mode = PRODUCTION;
  }
  const result = {
    mode,
    entry: getEntry({main, confs, server}),
    output: getOutput({path, confs}),
    optimization: getOptimization({mode, server}),
    plugins: getPlugins({path, stop, mode, BUNDLE}),
    module: getModule({mode}),
    resolve: getResolve({confs, root, moduleAlias}),
    resolveLoader: getResolveLoader({root}),
    node: getNode(),
    externals: confs.externals,
  };
  return result;
};

module.exports = myWebpack;
