import { expect, describe, it } from "bun:test";
import { getDotYo, promptResetDefault, promptFilterByOptions } from "../getDotYo";

describe("Test getDotYo", () => {
  it("test .yo", () => {
    const yoData = getDotYo({ bGetHomeYo: false, pwd: __dirname });
    expect(yoData).toEqual({ foo: "bar" });
  });
});

describe("Test promptResetDefault", () => {
  const prompts = [
    {
      type: "input",
      name: "foo",
      message: "Please input your generator name?",
      default: null as any,
    },
  ];

  it("test reassign default", () => {
    const nextPrompts = promptResetDefault(prompts, { foo: "bar" });
    expect(nextPrompts[0]!.default).toBe("bar");
  });
});

describe("Test promptFilterByOptions", () => {
  const prompts = [
    {
      type: "input",
      name: "foo",
      message: "Please input your generator name?",
      default: null as any,
    },
    {
      type: "input",
      name: "bar",
      message: "Please input your generator name?",
      default: null as any,
    },
  ];

  it("test clean already have ans", () => {
    const { nextPrompts, nextAnswer } = promptFilterByOptions(prompts, {
      foo: "bar",
    });
    expect(nextPrompts[0]!.name).toBe("bar");
    expect(nextAnswer).toEqual({ foo: "bar" });
  });
});
