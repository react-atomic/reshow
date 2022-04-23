const FS = require("fs");
const fileExists = require("./fileExists");
module.exports = (f) => fileExists(f) && FS.lstatSync(f).isDirectory();
