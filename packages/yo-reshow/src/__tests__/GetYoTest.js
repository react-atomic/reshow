const { expect } = require("chai");
const { YoGenerator, YoHelper, commonPrompt } = require("../index");

describe("Test GetYo", () => {
  it("basic test", () => {
    expect(YoGenerator).is.not.null;
    expect(YoHelper).is.not.null;
    expect(commonPrompt).is.not.null;
  });
});
