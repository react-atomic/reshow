export default (filePath, extMap) => {
  if (!filePath) {
    return filePath;
  }
  if (0 !== filePath.indexOf(".") && -1 === filePath.indexOf("!.")) {
    return filePath; // not local import
  }

  const baseName = filePath.split("/").splice(-1)[0];
  const extDotPos = baseName.lastIndexOf(".");
  const extNone = extMap[""];
  delete extMap[""];
  if (-1 === extDotPos) {
    // No extension
    return extNone ? filePath + extNone : filePath;
  }

  const extKeys = Object.keys(extMap);
  let nextPath = filePath;
  let isFind;
  let i = extKeys.length;
  while (i--) {
    const fromExt = extKeys[i];
    if (extDotPos === baseName.lastIndexOf(fromExt)) {
      nextPath = filePath.slice(0, -fromExt.length) + extMap[fromExt];
      isFind = true;
      break;
    }
  }
  if (extNone && nextPath === filePath && isFind) {
    nextPath = filePath + extNone;
  }
  return nextPath;
};
