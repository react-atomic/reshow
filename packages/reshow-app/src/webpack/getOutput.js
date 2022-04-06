const getOutput = ({ path, confs, server }) => {
  const output = {
    filename:
      confs.bustMode === "name"
        ? "[name].[fullhash].bundle.js"
        : "[name].bundle.js",
    path,
    publicPath: confs.assetsRoot || "",
  };
  if (server) {
    output.globalObject = "this";
  } else {
    output.chunkFilename = "[id].[fullhash].bundle.js";
    output.hotUpdateChunkFilename = "[id].[fullhash].hot.js";
  }
  return output;
};

export default getOutput;
