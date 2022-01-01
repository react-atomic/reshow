const path = require("path");
const {createRequire} = require('module');
const npxPath = path.join(path.dirname(process.execPath), '../lib/node_modules/npm/node_modules/libnpx/');
const npx = createRequire(npxPath)('libnpx');

const isOrgReg = /^@[^/]+\//;
const addOrgGenReg=/^@([^/]+)\/(generator-)?/;
const addGenReg=/^(generator-)?/;
const getPkgName = (generator) =>
  isOrgReg.test(generator)
    ? generator.replace(addOrgGenReg, "@$1/generator-")
    : generator.replace(addGenReg, "generator-");

const getNpxCmd = (argv) => {
  const generatorName = argv[2];
  const otherArgv = argv.slice(3);
  const [generatorPkg] = (generatorName || "").split(":");
  if (!generatorPkg) {
    return false;
  }

  const npmCli = path.join(path.dirname(process.execPath), 'npm');
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
};
