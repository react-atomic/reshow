/**
 * https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
 *
 */
import getTerser from "./getTerser";
import { PRODUCTION } from "./const";

const getVendorSplitConfig = ({ confs }) => ({
  test: /[\\/]node_modules[\\/]/,
  chunks: "initial",
  name: "vendor",
  filename:
    confs.bustMode === "name" ? "[name].[hash].bundle.js" : "[name].bundle.js",
  priority: -20,
  enforce: true,
  reuseExistingChunk: true,
});

const getOptimization = ({ mode, server, confs }) => {
  const cacheGroups = {};
  if (!confs.disableVendor) {
    cacheGroups.vendor = getVendorSplitConfig({ confs });
  }
  const results = {
    occurrenceOrder: true,
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
