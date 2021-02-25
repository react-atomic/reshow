const getOutput = ({path, confs, server}) => {
  const output = {
    filename:
      confs.bustMode === 'name'
        ? '[name].[hash].bundle.js'
        : '[name].bundle.js',
    path,
    publicPath: confs.assetsRoot,
    chunkFilename: '[id].[hash].bundle.js',
    hotUpdateChunkFilename: '[id].[hash].hot.js',
  };
  if (server) {
    output.globalObject = 'this';
  }
  return output;
};

export default getOutput;
