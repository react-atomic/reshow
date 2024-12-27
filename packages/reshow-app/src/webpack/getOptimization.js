// @ts-check

/**
 * https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
 *
 */
import getTerser from "./getTerser";
import { PRODUCTION } from "./const";

const getChunkConfig = ({ bustMode }) => ({
  chunks: "initial",
  filename:
    bustMode === "name" ? "[name].[fullhash:7].bundle.js" : "[name].bundle.js",
  enforce: true,
  reuseExistingChunk: true,
});

/**
 * @param {Object<any,any>} chunkConfig
 */
const getVendor = (chunkConfig) => ({
  ...chunkConfig,
  test: /[\/]node_modules[\/]/,
  name: "vendor",
  priority: -20,
});

/**
 * @param {Object<any,any>} chunkConfig
 */
const getLibVendor = (chunkConfig) => ({
  ...chunkConfig,
  test: /[\/]node_modules[\/](reshow|react-atomic|organism-react|ricon|class-lib|need-css|keyframe-css|easing-lib|hyphenate-style-name)/,
  name: "lib",
  priority: -10,
});

/**
 * @param {object} props
 * @param {string} props.mode
 * @param {boolean=} props.server
 * @param {Object<any, any>} props.confs
 */
const getOptimization = ({ mode, server, confs }) => {
  const chunkConfig = getChunkConfig(confs);
  const cacheGroups = {};
  if (!confs.disableVendor) {
    cacheGroups.defaultVendors = getVendor(chunkConfig);
    cacheGroups.libVendors = getLibVendor(chunkConfig);
  }
  const results = {
    chunkIds: "total-size",
    moduleIds: "size",
    usedExports: "global",
    removeAvailableModules: true,
  };
  if (!server && 1 !== confs.maxChunks) {
    results.splitChunks = {
      cacheGroups,
    };
  }
  if (PRODUCTION === mode) {
    results.minimize = true;
    results.minimizer = [getTerser()];
  }
  return results;
};

export default getOptimization;
