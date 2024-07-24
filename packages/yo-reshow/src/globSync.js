const FS = require("fs");
const PATH = require("path");

const globSync = (folderPath, callback, firstLevelOnly) => {
  const fileArr = FS.readdirSync(folderPath);
  while (fileArr.length !== 0) {
    const relativePath = fileArr.shift();
    const fullPath = PATH.join(folderPath, relativePath);
    if (FS.statSync(fullPath).isDirectory()) {
      if (!firstLevelOnly) {
        fileArr.push(
          ...FS.readdirSync(fullPath).map((v) => PATH.join(relativePath, v)),
        );
      }
    } else {
      const extname = PATH.extname(relativePath);
      callback({
        fullPath,
        relativePath,
        extname,
        filename: PATH.basename(relativePath, extname),
        basename: PATH.basename(relativePath),
        dirname: PATH.dirname(relativePath),
      });
    }
  }
};

module.exports = globSync;
