const getOutput = ({ path, confs, server }) => {
  const output = {
    filename:
      confs.bustMode === "name"
        ? "[name].[hash].bundle.js"
        : "[name].bundle.js",
    path,
    publicPath: confs.assetsRoot || "",
  };
  if (server) {
    output.globalObject = "this";
  } else {
    output.chunkFilename = "[id].[hash].bundle.js";
    output.hotUpdateChunkFilename = "[id].[hash].hot.js";
  }
  return output;
};

export default getOutput;
