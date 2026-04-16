import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import { YoTest } from "yo-unit";
import { YoGenerator, YoHelper } from "../index";

describe("mergePromptOrOption test", () => {
  describe("mergePromptOrOption this.prompt test", () => {
    class FakeGenerator extends YoGenerator {
      async prompting() {
        const { mergePromptOrOption } = YoHelper(this);
        const prompts = [
          { type: "input", name: "fakeName", message: `This is fake quetion?`, default: false },
          { type: "input", name: "foo", message: `This is fake quetion?` },
          { type: "input", name: "foo1", message: `This is fake quetion?` },
        ];
        (this as any).payload = await mergePromptOrOption(prompts, (nextPrompts: any[]) =>
          this.prompt(nextPrompts),
        );
      }
      writing() {}
    }

    let runResult: any;
    beforeAll(async () => {
      runResult = await YoTest({
        source: FakeGenerator,
        options: { pwd: __dirname, foo1: "bar1" },
        params: { fakeName: "fakeValue" },
      });
    });

    afterAll(() => { if (runResult) runResult.restore(); });

    it("test mergePromptOrOption", () => {
      expect(runResult.generator.payload).toEqual({ fakeName: "fakeValue", foo: "bar", foo1: "bar1" });
    });
  });

  describe("mergePromptOrOption promptChain test", () => {
    class FakeGenerator extends YoGenerator {
      async prompting() {
        const { promptChainAll } = YoHelper(this);
        const prompts = [
          { type: "input", name: "fakeName", message: `This is fake quetion?`, default: false },
          { type: "input", name: "foo", message: `This is fake quetion?` },
          { type: "input", name: "foo1", message: `This is fake quetion?` },
        ];
        (this as any).payload = await promptChainAll(prompts);
      }
      writing() {}
    }

    let runResult: any;
    beforeAll(async () => {
      runResult = await YoTest({
        source: FakeGenerator,
        options: { pwd: __dirname, foo1: "bar1" },
        params: { fakeName: "fakeValue" },
      });
    });

    afterAll(() => { if (runResult) runResult.restore(); });

    it("test mergePromptOrOption", () => {
      expect(runResult.generator.payload).toEqual({ fakeName: "fakeValue", foo: "bar", foo1: "bar1" });
    });
  });

  describe("mergePromptOrOption empty prompt test", () => {
    class FakeGenerator extends YoGenerator {
      async prompting() {
        const { mergePromptOrOption, promptChain, promptChainLocator } = YoHelper(this);
        (this as any).payload = await mergePromptOrOption([], (nextPrompts: any[]) =>
          promptChain(promptChainLocator(nextPrompts)),
        );
      }
      writing() {}
    }

    let runResult: any;
    beforeAll(async () => {
      runResult = await YoTest({
        source: FakeGenerator,
        options: { pwd: __dirname, foo1: "bar1" },
        params: { fakeName: "fakeValue" },
      });
    });

    afterAll(() => { if (runResult) runResult.restore(); });

    it("test mergePromptOrOption", () => {
      expect(runResult.generator.payload).toEqual({});
    });
  });
});
