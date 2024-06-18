//@ts-check

import * as React from "react";
const { isValidElement } = React;
import { expect } from "chai";
import build from "../index";

describe("Test build function", () => {
  it("test function", (done) => {
    build((/**@type any*/ props) => {
      expect(props.foo).to.equal("bar");
      done();
    })({ foo: "bar" });
  });

  it("test with force call", (done) => {
    const func = (/**@type any*/ props) => {
      expect(props.foo).to.equal("bar");
      done();
    };
    build(func, { doCallFunction: true })({ foo: "bar" });
  });

  it("test function with error", () => {
    const run = () => {
      build((/**@type any*/ props) => {
        expect(props.foo).to.equal("bar111");
      })({ foo: "bar" });
    };
    expect(run).to.throw();
  });

  it("test with stateless function return", () => {
    const func = (/**@type any*/ props) => <div {...props} />;
    const actual = build(func)({ foo: "barbar" });
    // will return react instance
    expect(actual?.props.foo).to.equal("barbar");
    expect(isValidElement(actual)).to.be.true;
  });

  it("test with func and child", () => {
    const result = build(() => "div")({ foo: "bar" }, "hello child");
    expect(result?.props.children).to.equal("hello child");
    expect(result?.props.foo).to.equal("bar");
  });

  it("test function with wrap return", () => {
    const actual = build(() => "foo", { altWrap: "div" })({ foo: "barbar" });
    expect(actual?.type).to.equal("div");
    expect(actual?.props.foo).to.equal("barbar");
  });

  it("test with empty", () => {
    const result = build()();
    expect(result).to.be.null;
  });

  it("test return null", () => {
    const result = build(() => undefined)();
    expect(result).to.be.null;
  });
});

describe("Test build with key", () => {
  it("with one child", () => {
    const comp = <div />;
    const buildComp = build(comp)({ key: "foo" });
    expect(buildComp?.key).to.equal("foo");
  });

  it("with multi child", () => {
    const comp = <div />;
    const buildComp = build([comp, comp])({ key: "foo" });
    expect(
      buildComp?.props.children[0].key !== buildComp?.props.children[1].key
    ).be.true;
  });

  it("with custom key", () => {
    const buildComp = build(() => <div key="div-key" />, {
      doCallFunction: true,
    })({ key: "foo" });
    expect(buildComp?.key).to.equal("div-key");
  });

  it("with custom key=null (for trace spec behavior)", () => {
    const buildComp = build(() => <div key={null} />, { doCallFunction: true })(
      { key: "foo" }
    );
    expect(buildComp?.key).to.equal("null");
  });

  it("with custom key=undefined", () => {
    const buildComp = build(() => <div />, { doCallFunction: true })({
      key: "foo",
    });
    expect(buildComp?.key).to.equal("foo");
    const buildComp2 = build(() => <div key={undefined} />, {
      doCallFunction: true,
    })({ key: "foo" });
    expect(buildComp2?.key).to.equal("foo");
  });
});
