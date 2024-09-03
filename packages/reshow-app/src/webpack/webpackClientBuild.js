// @ts-check

import getResolve, { getResolveLoader } from "./getResolve";
import getEntry from "./getEntry";
import getOptimization from "./getOptimization";
import getModule from "./getModule";
import getPlugins from "./getPlugins";
import getOutput from "./getOutput";
import getHotServer from "./getHotServer";
import getCache from "./getCache";
import { DEVELOPMENT, PRODUCTION } from "./const";
import progress from "./progress";

const { NODE_ENV, CONFIG, BUNDLE, HOT_UPDATE, ENABLE_SW } = process.env;
const processConfs = CONFIG ? JSON.parse(CONFIG) : {};

/**
 * @param {string} root
 * @param {Object<string,string>} main
 * @param {Object<any, any>=} lazyConfs
 */
export const webpackClientBuild = (root, main, lazyConfs) => {
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
