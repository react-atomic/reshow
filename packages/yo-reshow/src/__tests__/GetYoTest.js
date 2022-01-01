const { expect } = require("chai");
const getYo = require("../index");

describe("Test GetYo", () => {
  it("basic test", ()=>{
    const o = getYo();
    expect(o).is.not.null;
  });
});
