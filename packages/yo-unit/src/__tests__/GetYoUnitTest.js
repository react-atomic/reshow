const { expect } = require("chai");
const { YoTest, assert } = require("../index");

describe("Test yo-unit", () => {
  it("basic testt", () => {
    expect(YoTest).is.not.null;
    expect(assert).is.not.null;
  });
});
