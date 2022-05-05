export default (filepath, extMap) => {
  if (0 !== filepath.indexOf(".")) {
    return filepath; // not local import
  }

  const baseName = filepath.split("/").splice(-1)[0];
  const extDotPos = baseName.lastIndexOf(".");
  const extNone = extMap[""];
  delete extMap[""];
  if (-1 === extDotPos) {
    // No extension
    return extNone ? filepath + extNone : filepath;
  }

  const extPos = extDotPos + 1;
  const extKeys = Object.keys(extMap);
  let i = extKeys.length;
  while (i--) {
    const origExt = extKeys[i];
    if (extPos === baseName.lastIndexOf(origExt)) {
      filepath = filepath.slice(0, -origExt.length) + extMap[origExt];
      break;
    }
  }
  return filepath;
};
