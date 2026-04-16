import * as FS from "fs";
import * as PATH from "path";

interface GlobEntry {
  fullPath: string;
  relativePath: string;
  extname: string;
  filename: string;
  basename: string;
  dirname: string;
}

const globSync = (
  folderPath: string,
  callback: (entry: GlobEntry) => void,
  firstLevelOnly?: boolean
): void => {
  const fileArr = FS.readdirSync(folderPath);
  while (fileArr.length !== 0) {
    const relativePath = fileArr.shift()!;
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

export default globSync;
