const { expect } = require("chai");
const getYo = require("../index");
const getYoUnit = require("yo-unit");
const { YoGenerator, YoHelper } = getYo();
const { YoTest, assert } = getYoUnit();

class FakeGenerator extends YoGenerator {
  writing() {
    const { glob } = YoHelper(this);
    this.testGlob = [];
    glob(__dirname + "/templates", ({ dirname, basename }) => {
      this.testGlob.push({ dirname, basename });
    });
  }
}

describe("Glob test", () => {
  let runResult;
  before(async () => {
    runResult = await YoTest({
      source: FakeGenerator,
    });
  });

  after(() => {
    if (runResult) {
      runResult.restore();
    }
  });

  it("test glob", () => {
    const { generator } = runResult;
    expect(generator.testGlob).to.deep.equals([
      { dirname: "fakeSrc", basename: "fake2.js" },
      { dirname: "fakeSrc", basename: "fake1.js" },
    ]);
  });
});
