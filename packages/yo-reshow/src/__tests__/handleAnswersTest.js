const { expect } = require("chai");
const { YoTest, assert } = require("yo-unit");
const { YoGenerator, YoHelper } = require("../index");

class FakeGenerator extends YoGenerator {
  async prompting() {
    const { handleAnswers } = YoHelper(this);
    const prompts = [
      {
        type: "confirm",
        name: "fakeName",
        message: `This is fake quetion?`,
        default: false,
      },
    ];
    const answers = await this.prompt(prompts);
    const destArr = this.destinationRoot().split('/');
    answers.babelRootMode = true;
    answers.repositoryName = destArr.slice(-3)[0];
    answers.repositoryOrgName = "fake-org";
    handleAnswers(answers);
  }

  writing() {
    const { cp, chdir } = YoHelper(this);
    chdir(this.options.chdir);
  }
}

describe("handleAnswers test", () => {
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

  it("test auto repository directory", () => {
    const { generator } = runResult;
    const payload = generator.payload;
    expect(payload.repositoryHomepage).to.equal(`${payload.repository.url}/tree/main/${payload.repository.directory}`);
  });
});
