const FS = require("fs");
const isFile = require("./isFile");
module.exports = (f) => isFile(f) && FS.readFileSync(f, "utf8");
