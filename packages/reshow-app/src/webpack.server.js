import webpack from "webpack";
import getResolve, { getResolveLoader } from "./webpack/getResolve";
import getEntry from "./webpack/getEntry";
import getOptimization from "./webpack/getOptimization";
import getModule from "./webpack/getModule";
import getPlugins from "./webpack/getPlugins";
import getOutput from "./webpack/getOutput";
import getCache from "./webpack/getCache";
import { DEVELOPMENT, PRODUCTION } from "./webpack/const";
import progress from "./webpack/progress";

const { NODE_ENV, CONFIG } = process.env;
const processConfs = CONFIG ? JSON.parse(CONFIG) : {};

const myWebpack = (root, main, lazyConfs) => {
  const confs = { assetsFolder: "/assets", ...processConfs, ...lazyConfs };
  const server = true;
  const stop = progress({ confs });
  const path = root + confs.assetsFolder;
  const mode = PRODUCTION === NODE_ENV ? PRODUCTION : DEVELOPMENT;
  const result = {
    ...getCache({ mode }),
    mode,
    devtool: false,
    entry: getEntry({ root, main, confs, server }),
    externals: confs.externals,
    output: getOutput({ path, confs, server }),
    optimization: getOptimization({ mode, confs, server }),
    plugins: getPlugins({ root, path, stop, mode, confs, server }),
    module: getModule({ mode }),
    resolve: getResolve({ confs, root }),
    resolveLoader: getResolveLoader({ root }),
    target: "node",
  };
  return result;
};

module.exports = myWebpack;
