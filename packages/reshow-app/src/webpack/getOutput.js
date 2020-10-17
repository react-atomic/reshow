const getOutput = ({ path, confs }) => {
  return {
    filename:
      confs.bustMode === "name"
        ? "[name].[hash].bundle.js"
        : "[name].bundle.js",
    path,
    publicPath: confs.assetsRoot,
    chunkFilename: "[id].[hash].bundle.js",
  };
};

export default getOutput;
