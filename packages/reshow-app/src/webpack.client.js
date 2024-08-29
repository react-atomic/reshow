// @ts-check

import getResolve, { getResolveLoader } from "./webpack/getResolve";
import getEntry from "./webpack/getEntry";
import getOptimization from "./webpack/getOptimization";
import getModule from "./webpack/getModule";
import getPlugins from "./webpack/getPlugins";
import getOutput from "./webpack/getOutput";
import getHotServer from "./webpack/getHotServer";
import getCache from "./webpack/getCache";
import { DEVELOPMENT, PRODUCTION } from "./webpack/const";
import progress from "./webpack/progress";

const { NODE_ENV, CONFIG, BUNDLE, HOT_UPDATE, ENABLE_SW } = process.env;
const processConfs = CONFIG ? JSON.parse(CONFIG) : {};

/**
 * @param {string} root
 * @param {Object<string,string>} main
 * @param {Object<any, any>} lazyConfs
 */
const myWebpack = (root, main, lazyConfs) => {
  const confs = { assetsFolder: "/assets", ...processConfs, ...lazyConfs };
  const stop = progress({ confs });
  const path = root + confs.assetsFolder;
  let mode = DEVELOPMENT;
  /**
   * @type {string|boolean}
   */
  let devtool = "cheap-source-map";
  if (PRODUCTION === NODE_ENV) {
    mode = PRODUCTION;
    devtool = false;
  }
  const result = {
    ...getCache({ mode }),
    mode,
    devtool,
    entry: getEntry({ root, main }),
    output: getOutput({ path, confs }),
    optimization: getOptimization({ mode, confs }),
    plugins: getPlugins({
      root,
      path,
      stop,
      mode,
      BUNDLE,
      HOT_UPDATE,
      ENABLE_SW,
      confs,
    }),
    module: getModule(),
    resolve: getResolve({ root, confs }),
    resolveLoader: getResolveLoader({ root }),
    externals: confs.externals,
    devServer: undefined,
  };
  if (HOT_UPDATE) {
    result.devServer = /**@type any*/ (getHotServer({ root, confs }));
  }
  return result;
};

export default myWebpack;
