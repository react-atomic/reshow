import { expect } from "chai";
import getYo from "../index";
const { YoTest, YoGenerator, YoHelper, assert } = getYo();

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
