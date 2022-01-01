const { expect } = require("chai");
const {
  getDotYo,
  promptResetDefault,
  promptFilterByOptions,
} = require("../getDotYo");

describe("Test getDotYo", () => {
  it("test .yo", () => {
    const yoData = getDotYo({ bGetHomeYo: false, pwd: __dirname });
    expect(yoData).to.deep.equal({ foo: "bar" });
  });
});

describe("Test promptResetDefault", () => {
  const prompts = [
    {
      type: "input",
      name: "foo",
      message: "Please input your generator name?",
      default: null,
    },
  ];

  it("test reassign default", () => {
    const nextPrompts = promptResetDefault(prompts, { foo: "bar" });
    expect(nextPrompts[0].default).to.equal("bar");
  });
});

describe("Test promptFilterByOptions", () => {
  const prompts = [
    {
      type: "input",
      name: "foo",
      message: "Please input your generator name?",
      default: null,
    },
    {
      type: "input",
      name: "bar",
      message: "Please input your generator name?",
      default: null,
    },
  ];

  it("test clean already have ans", () => {
    const { nextPrompts, nextAnswer } = promptFilterByOptions(prompts, {
      foo: "bar",
    });
    expect(nextPrompts[0].name).to.equal("bar");
    expect(nextAnswer).to.deep.equal({ foo: "bar" });
  });
});
