import fs from "fs";

let gPackageJsonType;

const getPackageJsonType = (rootContext) => {
  if (gPackageJsonType == null) {
    const f = `${rootContext}/package.json`;
    const rawPackageJson = fs.readFileSync(f, { encoding: "utf8" });
    const { type: packageJsonType } = JSON.parse(rawPackageJson);
    gPackageJsonType = packageJsonType;
  }
  return gPackageJsonType;
};

const isUseEsm = (resourcePath, rootContext) => {
  const fileExtensions = resourcePath?.split(".").slice(-1)[0];
  if ("mjs" === fileExtensions) {
    return true;
  }
  if ("module" === getPackageJsonType(rootContext)) {
    return true;
  } else {
    return false;
  }
};

export default isUseEsm;
