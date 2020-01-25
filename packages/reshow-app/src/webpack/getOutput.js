const getOutput = ({path, confs}) => {
  return {
    filename: '[name].bundle.js',
    path,
    publicPath: confs.assetsRoot,
    chunkFilename: "[id].[hash].bundle.js"
  };
};

export default getOutput;
