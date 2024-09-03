// @ts-check

import getResolve, { getResolveLoader } from "./getResolve";
import getEntry from "./getEntry";
import getOptimization from "./getOptimization";
import getModule from "./getModule";
import getPlugins from "./getPlugins";
import getOutput from "./getOutput";
import getCache from "./getCache";
import { DEVELOPMENT, PRODUCTION } from "./const";
import progress from "./progress";

const { NODE_ENV, CONFIG } = process.env;
const processConfs = CONFIG ? JSON.parse(CONFIG) : {};

/**
 * @param {string} root
 * @param {Object<string,string>} main
 * @param {Object<any, any>=} lazyConfs
 */
export const webpackServerBuild = (root, main, lazyConfs) => {
  const confs = { assetsFolder: "/assets", ...processConfs, ...lazyConfs };
  const server = true;
  const stop = progress({ confs });
  const path = root + confs.assetsFolder;
  const mode = PRODUCTION === NODE_ENV ? PRODUCTION : DEVELOPMENT;
  const result = {
    ...getCache({ mode }),
    mode,
    devtool: false,
    entry: getEntry({ root, main, server }),
    externals: confs.externals,
    output: getOutput({ path, confs, server }),
    optimization: getOptimization({ mode, confs, server }),
    plugins: getPlugins({ root, path, stop, mode, confs, server }),
    module: getModule(),
    resolve: getResolve({ confs, root }),
    resolveLoader: getResolveLoader({ root }),
  };
  return result;
};
