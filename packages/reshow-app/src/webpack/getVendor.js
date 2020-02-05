const getVendorSplitConfig = () => ({
  test: /node_modules/,
  // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
  chunks: 'initial',
  name: 'vendor',
  filename: '[name].bundle.js',
  priority: 10,
  enforce: true,
});

export {getVendorSplitConfig};
