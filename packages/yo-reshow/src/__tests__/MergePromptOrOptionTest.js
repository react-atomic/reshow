const { expect } = require("chai");
const { YoTest, assert } = require("yo-unit");
const { YoGenerator, YoHelper } = require("../index");

describe("mergePromptOrOption test", () => {
  describe("mergePromptOrOption this.prompt test", () => {
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
          {
            type: "input",
            name: "foo",
            message: `This is fake quetion?`,
          },
          {
            type: "input",
            name: "foo1",
            message: `This is fake quetion?`,
          },
        ];
        this.payload = await mergePromptOrOption(prompts, (nextPrompts) =>
          this.prompt(nextPrompts)
        );
      }

      writing() {}
    }

    let runResult;
    before(async () => {
      runResult = await YoTest({
        source: FakeGenerator,
        options: { pwd: __dirname, foo1: "bar1" },
        params: {
          fakeName: "fakeValue",
        },
      });
    });

    after(() => {
      if (runResult) {
        runResult.restore();
      }
    });

    it("test mergePromptOrOption", () => {
      const { generator } = runResult;
      expect(generator.payload).to.deep.equal({
        fakeName: "fakeValue",
        foo: "bar",
        foo1: "bar1",
      });
    });
  });

  describe("mergePromptOrOption promptChain test", () => {
    class FakeGenerator extends YoGenerator {
      async prompting() {
        const { promptChainAll } = YoHelper(this);
        const prompts = [
          {
            type: "input",
            name: "fakeName",
            message: `This is fake quetion?`,
            default: false,
          },
          {
            type: "input",
            name: "foo",
            message: `This is fake quetion?`,
          },
          {
            type: "input",
            name: "foo1",
            message: `This is fake quetion?`,
          },
        ];
        this.payload = await promptChainAll(prompts);
      }

      writing() {}
    }

    let runResult;
    before(async () => {
      runResult = await YoTest({
        source: FakeGenerator,
        options: { pwd: __dirname, foo1: "bar1" },
        params: {
          fakeName: "fakeValue",
        },
      });
    });

    after(() => {
      if (runResult) {
        runResult.restore();
      }
    });

    it("test mergePromptOrOption", () => {
      const { generator } = runResult;
      expect(generator.payload).to.deep.equal({
        fakeName: "fakeValue",
        foo: "bar",
        foo1: "bar1",
      });
    });
  });

  describe("mergePromptOrOption empty prompt test", () => {
    class FakeGenerator extends YoGenerator {
      async prompting() {
        const { mergePromptOrOption, promptChain, promptChainLocator } =
          YoHelper(this);
        const prompts = [];
        this.payload = await mergePromptOrOption(prompts, (nextPrompts) =>
          promptChain(promptChainLocator(nextPrompts))
        );
      }

      writing() {}
    }
    let runResult;
    before(async () => {
      runResult = await YoTest({
        source: FakeGenerator,
        options: { pwd: __dirname, foo1: "bar1" },
        params: {
          fakeName: "fakeValue",
        },
      });
    });

    after(() => {
      if (runResult) {
        runResult.restore();
      }
    });

    it("test mergePromptOrOption", () => {
      const { generator } = runResult;
      expect(generator.payload).to.deep.equal({});
    });
  });
});
