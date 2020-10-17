import typeIs from "../getTypeOf";
import helperTypeof from "../typeof";
import { expect } from "chai";

describe("Test typeof", () => {
  class FOO {}
  class t {}
  const symbol1 = Symbol();

  it("test typeIs", () => {
    expect(typeIs(symbol1)).to.equal("symbol");
    expect(typeIs({})).to.equal("object");
    expect(typeIs(() => {})).to.equal("function");
    expect(typeIs(new FOO())).to.equal("foo");
    expect(typeIs(undefined)).to.equal("undefined");
    expect(typeIs(null)).to.equal("null");
  });

  it("test helper typeof", () => {
    expect(helperTypeof(symbol1)).to.equal("symbol");
    expect(helperTypeof({})).to.equal("object");
    expect(helperTypeof(new FOO())).to.equal("object");
    expect(helperTypeof(new t())).to.equal("object");
    expect(helperTypeof(1)).to.equal("number");
    expect(helperTypeof("1")).to.equal("string");
    expect(helperTypeof(true)).to.equal("boolean");
    expect(helperTypeof(() => {})).to.equal("function");
    expect(helperTypeof(undefined)).to.equal("undefined");
    expect(helperTypeof(null)).to.equal("object");
  });

  it("test typeof array", () => {
    expect(helperTypeof([])).to.equal("object");
    expect(typeIs([])).to.equal("array");
  });
});
