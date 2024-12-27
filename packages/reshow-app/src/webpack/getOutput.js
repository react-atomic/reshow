// @ts-check

/**
 * @typedef {object} GetOutputProps
 * @property {string} path
 * @property {Object<string,any>} confs
 * @property {boolean=} server
 */

/**
 * https://webpack.js.org/configuration/output/
 * @param {GetOutputProps} props
 */
const getOutput = ({ path, confs, server }) => {
  const output = {
    filename:
      confs.bustMode === "name"
        ? "[name].[fullhash:7].bundle.js"
        : "[name].bundle.js",
    path,
    publicPath: confs.assetsRoot || "",
  };
  if (server) {
    output.globalObject = "this";
  } else {
    output.chunkFilename = "[id].[fullhash:7].bundle.js";
    output.hotUpdateChunkFilename = "[id].[fullhash:7].hot.js";
    output.hotUpdateMainFilename = "[runtime].[fullhash:7].hot.js";
  }
  return output;
};

export default getOutput;
