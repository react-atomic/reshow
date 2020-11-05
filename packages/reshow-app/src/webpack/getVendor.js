/**
 * https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
 *
 */
const getVendorSplitConfig = ({ confs }) => ({
  test: /node_modules/,
  chunks: "initial",
  name: "vendor",
  filename:
    confs.bustMode === "name" ? "[name].[hash].bundle.js" : "[name].bundle.js",
  priority: 10,
  enforce: true,
  reuseExistingChunk: true,
});

export { getVendorSplitConfig };
