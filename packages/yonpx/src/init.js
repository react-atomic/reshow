const npx = require("libnpx");
const path = require("path");
const globalDirs = require('global-dirs');

const pkgReg = /^@[^/]+\//;
const getPkgName = (generator) =>
  pkgReg.test(generator)
    ? generator.replace(/^@([^/]+)\/(generator-)?/, "@$1/generator-")
    : generator.replace(/^(generator-)?/, "generator-");

const getNpxCmd = (argv) => {
  const generatorName = argv[2];

  const otherArgv = argv.slice(3);
  const [generatorPkg] = (generatorName || "").split(":");
  if (!generatorPkg) {
    return false;
  }

  const npmCli = path.join(globalDirs.npm.binaries, 'npm');

  const parsed = npx.parseArgs([
    "-p",
    "yo",
    "-p",
    getPkgName(generatorPkg),
    "-c",
    `yo ${generatorName} ${otherArgv.join(" ")}`,
  ], npmCli);
  return parsed;
};

const init = (props) => {
  const cmdOptions = getNpxCmd(process.argv);
  if (cmdOptions) {
    npx(cmdOptions);
  }
};

module.exports = {
  init,
  getNpxCmd,
};
