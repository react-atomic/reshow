const FS = require("fs");
const fileExists = require("./fileExists");
const isDir = require("./isDir");
module.exports = (f) => fileExists(f) && !isDir(f);
