const { expect } = require("chai");
const getYo = require("../index");
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
    const { cp, chdir } = YoHelper(this);
    chdir(this.options.chdir);
  }
}

describe("Chdir test", () => {
  let runResult;
  before(async () => {
    runResult = await YoTest({
      source: FakeGenerator,
      options: { chdir: "abc" },
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

  it("test chdir", () => {
    const { generator } = runResult;
    const expected = generator.contextRoot + "/abc";
    expect(generator.destinationPath()).to.equal(expected);
  });
});
