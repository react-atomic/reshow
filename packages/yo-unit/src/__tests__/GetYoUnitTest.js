const { expect } = require("chai");
const getYoUnit = require("../index");

describe("Test yo-unit", () => {
  it("basic testt", () => {
    const o = getYoUnit();
    expect(o).is.not.null;
  });
});
