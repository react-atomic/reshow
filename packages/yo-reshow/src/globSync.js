import FS from "fs";
import PATH from "path";

const globSync = (folderPath, callback) => {
  const fileArr = FS.readdirSync(folderPath);
  while (fileArr.length !== 0) {
    const relativePath = fileArr.pop();
    const fullPath = PATH.join(folderPath, relativePath);
    if (FS.statSync(fullPath).isDirectory()) {
      fileArr.push(
        ...FS.readdirSync(fullPath).map((v) => PATH.join(relativePath, v))
      );
    } else {
      callback({
        fullPath,
        relativePath,
        basename: PATH.basename(relativePath),
        dirname: PATH.dirname(relativePath),
      });
    }
  }
};

export default globSync;
