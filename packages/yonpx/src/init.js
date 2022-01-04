const PATH = require("path");
const FS = require("fs");
const { createRequire } = require("module");

const npxPath = () => {
  const path = "node_modules/npm/node_modules/libnpx/";
  const binPath = PATH.dirname(process.execPath);
  const getPath = (p) => PATH.join(binPath, ...p);
  let libnpx = getPath(["../lib", path]);
  if (!FS.existsSync(libnpx)) {
    libnpx = getPath([path]);
  }
  if (!FS.existsSync(libnpx)) {
    libnpx = getPath(["../lib", "node_modules/npm/lib/cli.js"]);
  }
  return { libnpx, npmCli: getPath(["npm"]) };
};
const { libnpx, npmCli } = npxPath();

const npx8 = (cmd) => {
  const npmcli = require(libnpx);
  process.argv[1] = libnpx;
  process.argv.splice(2, 0, "exec");
  for (let i = 0, j = cmd.length; i < j; i++) {
    process.argv[i + 3] = cmd[i];
  }
  npmcli(process);
};

const npx =
  libnpx.substr(-6) === "cli.js" ? npx8 : createRequire(libnpx)("libnpx");

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

  let cmd = [
    "--package",
    "yo",
    "--package",
    getPkgName(generatorPkg),
    "--call",
    `yo ${generatorName} ${otherArgv.join(" ")}`,
  ];
  if (npx.parseArgs != null) {
    cmd = npx.parseArgs(cmd, npmCli);
  }

  return cmd;
};

const init = async () => {
  const argv = process.argv;
  const cmdOptions = getNpxCmd(argv);
  if (cmdOptions) {
    await npx(cmdOptions);
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
