const { expect } = require("chai");
const { init, getNpxCmd, getPkgName } = require("../init");

describe("Test yonpx", () => {
  it("test getNpxCmd", () => {
    /*your test code*/
    const actual = getNpxCmd(["", "", "reshow"]);
    expect(actual.p).to.deep.equal(["yo@latest", "generator-reshow@latest"]);
  });
});

describe("Test getPkgName", () => {
  it("basic app", ()=>{
    const generatorName = 'app';
    const actual = getPkgName(generatorName);
    expect(actual).to.equal('generator-app');
  });

  it("org with app", ()=>{
    const generatorName = '@org/app';
    const actual = getPkgName(generatorName);
    expect(actual).to.equal('@org/generator-app');
  });
});
