import fs from "fs";

const isFile = (f) => fs.existsSync(f);
const pkgType = { current: null };

const getPackageJsonType = (rootContext) => {
  if (pkgType.current == null) {
    const f = `${rootContext}/package.json`;
    if (isFile(f)) {
      const rawPackageJson = fs.readFileSync(f, { encoding: "utf8" });
      const { type: packageJsonType } = JSON.parse(rawPackageJson);
      pkgType.current = packageJsonType || false;
    }
  }
  return pkgType.current;
};

/**
 * https://webpack.js.org/guides/ecma-script-modules/
 */
const isUseEsm = (resourcePath, rootContext) => {
  const fileExtensions = resourcePath?.split(".").slice(-1)[0];
  let isEsm = false;
  switch (fileExtensions) {
    case "mjs":
      isEsm = true;
      break;
    case "cjs":
      isEsm = false;
      break;
    default:
      if ("module" === getPackageJsonType(rootContext)) {
        isEsm = true;
      }
      break;
  }
  return isEsm;
};

export default isUseEsm;
export { pkgType };
