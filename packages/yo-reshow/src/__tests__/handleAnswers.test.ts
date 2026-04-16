import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import { YoTest, assert } from "yo-unit";
import { YoGenerator, YoHelper } from "../index";

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
    const destArr = this.destinationRoot().split("/");
    answers.babelRootMode = true;
    answers.repositoryName = destArr.slice(-3)[0];
    answers.repositoryOrgName = "fake-org";
    handleAnswers(answers);
  }

  writing() {
    const { chdir } = YoHelper(this);
    chdir((this.options as any).chdir);
  }
}

describe("handleAnswers test", () => {
  let runResult: any;
  beforeAll(async () => {
    runResult = await YoTest({
      source: FakeGenerator,
      options: { chdir: "abc" },
      params: {
        fakeName: "bar",
      },
    });
  });

  afterAll(() => {
    if (runResult) {
      runResult.restore();
    }
  });

  it("test auto repository directory", () => {
    const { generator } = runResult;
    const payload = generator.payload;
    expect(payload.repositoryHomepage).toBe(
      `${payload.repository.url}/tree/main/${payload.repository.directory}`,
    );
  });
});
