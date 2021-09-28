import { expect } from "chai";

import {
  UNDEFINED,
  FUNCTION,
  OBJECT,
  DEFAULT,
  STRING,
  SYMBOL,
  SCRIPT,
  TYPE_ERROR,
  T_UNDEFINED,
  T_NULL,
  T_TRUE,
  T_FALSE,
  KEYS,
  IS_ARRAY,
} from "../index";

describe("Test Constant", () => {
  it("test undefined", () => {
    expect(UNDEFINED).to.equal("undefined");
  });

  it("test function", () => {
    expect(FUNCTION).to.equal("function");
  });

  it("test object", () => {
    expect(OBJECT).to.equal("object");
  });

  it("test default", () => {
    expect(DEFAULT).to.equal("default");
  });

  it("test string", () => {
    expect(STRING).to.equal("string");
  });

  it("test symbol", () => {
    expect(SYMBOL).to.equal("symbol");
  });

  it("test script", () => {
    expect(SCRIPT).to.equal("script");
  });

  it("test TYPE_ERROR", () => {
    expect(TYPE_ERROR).to.equal("TypeError");
  });
});

describe("Test Type", () => {
  it("test type undefined", () => {
    expect(T_UNDEFINED).to.be.undefined;
  });

  it("test type null", () => {
    expect(T_NULL).to.be.null;
  });

  it("test type true", () => {
    expect(T_TRUE).to.be.true;
  });

  it("test type false", () => {
    expect(T_FALSE).to.be.false;
  });
});

describe("Test FUNCTION", () => {
  it("test keys", () => {
    const a = { foo: "bar" };
    expect(KEYS(a)).to.deep.equal(["foo"]);
  });

  it("test isArray", () => {
    const a = ["foo"];
    expect(IS_ARRAY(a)).to.be.true;
  });

  it("test is not Array", () => {
    const a = { foo: "bar" };
    expect(IS_ARRAY(a)).to.be.false;
  });
});
