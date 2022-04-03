import { isValidElement } from "react";
import { expect } from "chai";
import build from "../index";

describe("Test build function", () => {
  it("test function", (done) => {
    build((props) => {
      expect(props.foo).to.equal("bar");
      done();
    })({ foo: "bar" });
  });

  it("test with force call", (done) => {
    const func = (props) => {
      expect(props.foo).to.equal("bar");
      done();
    };
    build(func, { doCallFunction: true })({ foo: "bar" });
  });

  it("test function with error", () => {
    const run = () => {
      build((props) => {
        expect(props.foo).to.equal("bar111");
      })({ foo: "bar" });
    };
    expect(run).to.throw();
  });

  it("test function with return", () => {
    const a = build((props) => props.foo)({ foo: "barbar" });
    expect(a).to.equal("barbar");
  });

  it("test with stateless function return", () => {
    const func = (props) => <div {...props} />;
    const a = build(func)({ foo: "barbar" });
    // will return react instance
    expect(a.props.foo).to.equal("barbar");
    expect(isValidElement(a)).to.be.true;
  });

  it("test with func and child", () => {
    const result = build((props) => props)({ foo: "bar" }, "hello child");
    expect(result.children).to.equal("hello child");
    expect(result.foo).to.equal("bar");
  });

  it("test with empty", () => {
    const result = build()();
    expect(result).to.be.null;
  });
});

describe("Test build with key", () => {
  it("with one child", () => {
    const comp = <div />;
    const buildComp = build(comp)({ key: "foo" });
    expect(buildComp.key).to.equal("foo");
  });

  it("with multi child", () => {
    const comp = <div />;
    const buildComp = build([comp, comp])({ key: "foo" });
    expect(buildComp[0].key !== buildComp[1].key).be.true;
  });
});
