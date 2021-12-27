/**
 * https://yeoman.io/authoring/composability.html
 * https://github.com/yeoman/generator-generator/blob/a4abe0c371ee36476ede29dcd29f8f6c8e3b22e6/app/index.js
 */

import { expect } from "chai";
import PATH from "path";
import getYo from "../index";
const { YoTest, YoGenerator, YoHelper, assert } = getYo();

const order = [];
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

    // use runContext.env.registerStub to avoid CircleCI hang
    const sub = this.composeWith("composed:sub");

    order.push("parent prompting");

    this.payload = await mergePromptOrOption(prompts, (nextPrompts) =>
      this.prompt(nextPrompts)
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
    this.options.payload = await this.prompt(prompts);
    order.push("sub prompting");
  }

  writing() {
    order.push("sub writing");
  }
}

describe("ComposeWithTest", () => {
  let runResult;
  before(async () => {
    runResult = await YoTest({
      source: FakeGenerator,
      options: { pwd: __dirname, foo1: "bar1" },
      params: {
        fakeName: "fakeValue",
      },
      build: (runContext) => {
        runContext.env.registerStub(SubGenerator, "composed:sub");
      },
    });
  });

  after(() => {
    if (runResult) {
      runResult.restore();
    }
  });

  it("test composeWith", () => {
    expect(order).to.deep.equal([
      "parent prompting",
      "sub prompting",
      "parent writing",
      "sub writing",
    ]);
  });
});
