const { expect } = require("chai");
const { init, getNpxCmd } = require("../init");

describe("Test yonpx", () => {
  it("test getNpxCmd", () => {
    /*your test code*/
    const actual = getNpxCmd(["", "", "reshow"]);
    expect(actual.p).to.deep.equal(["yo@latest", "generator-reshow@latest"]);
  });
});
