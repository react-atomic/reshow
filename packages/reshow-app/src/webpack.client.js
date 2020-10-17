import webpack from "webpack";
import getResolve, { getResolveLoader, getNode } from "./webpack/getResolve";
import getEntry from "./webpack/getEntry";
import getOptimization from "./webpack/getOptimization";
import getModule from "./webpack/getModule";
import getPlugins from "./webpack/getPlugins";
import getOutput from "./webpack/getOutput";
import getDevServer from "./webpack/getDevServer";
import { DEVELOPMENT, PRODUCTION } from "./webpack/const";
import progress from "./webpack/progress";

const { NODE_ENV, CONFIG, BUNDLE, HOT_UPDATE } = process.env;
let confs = CONFIG ? JSON.parse(CONFIG) : {};

const myWebpack = (root, main, lazyConfs) => {
  confs = { ...confs, ...lazyConfs };
  const stop = progress({ confs });
  const path = root + "/assets";
  let mode = DEVELOPMENT;
  let devtool = "cheap-source-map";
  if (PRODUCTION === NODE_ENV) {
    mode = PRODUCTION;
    devtool = false;
  } else {
    confs.bustMode = null;
  }
  const result = {
    mode,
    devtool,
    entry: getEntry({ main, confs }),
    output: getOutput({ path, confs }),
    optimization: getOptimization({ mode, confs }),
    plugins: getPlugins({ path, stop, mode, confs, BUNDLE, HOT_UPDATE }),
    module: getModule({ mode, HOT_UPDATE }),
    resolve: getResolve({ confs, root }),
    resolveLoader: getResolveLoader({ root }),
    node: getNode(),
    externals: confs.externals,
  };
  if (HOT_UPDATE) {
    result.devServer = getDevServer({ confs, path });
  }
  return result;
};

module.exports = myWebpack;
