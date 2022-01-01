const PATH = require("path");
const FS = require("fs");
const { createRequire } = require("module");

const npxPath = () => {
  const path = "node_modules/npm/node_modules/libnpx/";
  const binPath = PATH.dirname(process.execPath);
  let libnpx = PATH.join(binPath, "../lib/" + path);
  if (!FS.existsSync(libnpx)) {
    libnpx = PATH.join(binPath, path);
  }
  return libnpx;
};
const npx = createRequire(npxPath())("libnpx");

const pkgPrefix = "generator-";
const isOrgReg = /^@[^/]+\//;
const addOrgGenReg = /^@([^/]+)\/(generator-)?/;
const addGenReg = new RegExp(`^(${pkgPrefix})?`);
const getPkgName = (generator) =>
  isOrgReg.test(generator)
    ? generator.replace(addOrgGenReg, "@$1/" + pkgPrefix)
    : generator.replace(addGenReg, pkgPrefix);

const getNpxCmd = (argv) => {
  const generatorName = argv[2];
  const otherArgv = argv.slice(3);
  const [generatorPkg] = (generatorName || "").split(":");
  if (!generatorPkg) {
    return false;
  }

  const npmCli = PATH.join(PATH.dirname(process.execPath), "npm");
  const parsed = npx.parseArgs(
    [
      "-p",
      "yo",
      "-p",
      getPkgName(generatorPkg),
      "-c",
      `yo ${generatorName} ${otherArgv.join(" ")}`,
    ],
    npmCli
  );
  return parsed;
};

const init = async (props) => {
  const argv = process.argv;
  const cmdOptions = getNpxCmd(argv);
  if (cmdOptions) {
    await npx(cmdOptions);
    process.exit(0);
  } else {
    console.error("Generator not found.", argv);
    process.exit(1);
  }
};

module.exports = {
  init,
  getNpxCmd,
  getPkgName,
  npxPath,
};
