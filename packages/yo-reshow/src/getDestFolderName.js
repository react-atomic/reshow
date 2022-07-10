const PATH = require("path");
const getDestFolderName = (oGen) => PATH.basename(oGen.destinationRoot());
module.exports = getDestFolderName;
