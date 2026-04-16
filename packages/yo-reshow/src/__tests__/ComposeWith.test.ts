/**
 * https://yeoman.io/authoring/composability.html
 * https://github.com/yeoman/generator/blob/main/lib/index.js#L1206
 * https://github.com/yeoman/generator-generator/blob/a4abe0c371ee36476ede29dcd29f8f6c8e3b22e6/app/index.js
 */
import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import { YoTest } from "yo-unit";
import { YoGenerator, YoHelper } from "../index";

const order: string[] = [];

class FakeGenerator extends YoGenerator {
  async prompting() {
    const { mergePromptOrOption } = YoHelper(this);
    const prompts = [
      {
        type: "input",
        name: "fakeName",
        message: `This is fake quetion?`,
        default: false,
      },
    ];

    const sub = this.composeWith("composed:sub");
    order.push("parent prompting");

    (this as any).payload = await mergePromptOrOption(prompts, (nextPrompts: any[]) =>
      this.prompt(nextPrompts),
    );
  }

  writing() {
    order.push("parent writing");
  }
}

class SubGenerator extends YoGenerator {
  async prompting() {
    const prompts = [
      {
        type: "input",
        name: "subfakeName",
        message: `This is fake quetion?`,
        default: "subFake",
      },
    ];
    (this.options as any).payload = await this.prompt(prompts);
    order.push("sub prompting");
  }

  writing() {
    order.push("sub writing");
  }
}

describe("ComposeWithTest", () => {
  let runResult: any;
  beforeAll(async () => {
    runResult = await YoTest({
      source: FakeGenerator,
      options: { pwd: __dirname, foo1: "bar1" },
      params: { fakeName: "fakeValue" },
      build: (runContext: any) => {
        runContext.env.registerStub(SubGenerator, "composed:sub");
      },
    });
  });

  afterAll(() => {
    if (runResult) runResult.restore();
  });

  it("test composeWith", () => {
    expect(order).toEqual([
      "parent prompting",
      "sub prompting",
      "parent writing",
      "sub writing",
    ]);
  });
});
