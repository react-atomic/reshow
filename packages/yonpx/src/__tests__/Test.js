const { expect } = require("chai");
const FS = require("fs");
const { init, getNpxCmd, getPkgName, npxPath } = require("../init");

describe("Test yonpx", () => {
  it("test getNpxCmd", () => {
    /*your test code*/
    const actual = getNpxCmd(["", "", "reshow"]);
    expect(actual.p).to.deep.equal(["yo@latest", "generator-reshow@latest"]);
  });
});

describe("Test getPkgName", () => {
  it("basic app", () => {
    const generatorName = "app";
    const actual = getPkgName(generatorName);
    expect(actual).to.equal("generator-app");
  });

  it("org with app", () => {
    const generatorName = "@org/app";
    const actual = getPkgName(generatorName);
    expect(actual).to.equal("@org/generator-app");
  });
});

describe("Test npxPath", () => {
  const isExists = (f) => FS.existsSync(f);
  it("test npxPath", () => {
    const { libnpx, npmCli } = npxPath();
    console.log("npx path: " + libnpx);
    expect(isExists(libnpx)).to.be.true;
    expect(isExists(npmCli)).to.be.true;
  });
});
