import { expect } from "chai";
import getYo from "../index";
const { YoTest, YoGenerator, YoHelper, assert } = getYo();

class FakeGenerator extends YoGenerator {
  async prompting() {
    const { say } = YoHelper(this);
    const prompts = [
      {
        type: "confirm",
        name: "fakeName",
        message: `This is fake quetion?`,
        default: false,
      },
    ];
    const answers = await this.prompt(prompts);
    this.fakeName = answers.fakeName;
  }

  writing() {
    const { glob } = YoHelper(this);
    this.testDir = [];
    glob(__dirname + "/templates", ({ dirname, basename }) => {
      this.testDir.push({ dirname, basename });
    });
  }
}

describe("Glob test", () => {
  let runResult;
  before(async () => {
    runResult = await YoTest({
      source: FakeGenerator,
      params: {
        fakeName: "bar",
      },
    });
  });

  after(() => {
    if (runResult) {
      runResult.restore();
    }
  });

  it("test glob", () => {
    const { generator } = runResult;
    expect(generator.testDir).to.deep.equals([
      { dirname: "fakeSrc", basename: "fake2.js" },
      { dirname: "fakeSrc", basename: "fake1.js" },
    ]);
  });
});
