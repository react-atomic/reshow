import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import { YoTest } from "yo-unit";
import { YoGenerator, YoHelper } from "../index";

class FakeGenerator extends YoGenerator {
  async prompting() {
    const prompts = [
      {
        type: "confirm",
        name: "fakeName",
        message: `This is fake quetion?`,
        default: false,
      },
    ];
    const answers = await this.prompt(prompts);
    (this as any).fakeName = answers.fakeName;
  }

  writing() {
    const { chdir } = YoHelper(this);
    chdir((this.options as any).chdir);
  }
}

describe("Chdir test", () => {
  let runResult: any;
  beforeAll(async () => {
    runResult = await YoTest({
      source: FakeGenerator,
      options: { chdir: "abc" },
      params: { fakeName: "bar" },
    });
  });

  afterAll(() => {
    if (runResult) runResult.restore();
  });

  it("test chdir", () => {
    const { generator } = runResult;
    const expected = generator.contextRoot + "/abc";
    expect(generator.destinationPath()).toBe(expected);
  });
});
