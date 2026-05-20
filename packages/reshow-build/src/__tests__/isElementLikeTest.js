// @ts-check

import * as React from "react";
import { expect } from "chai";

import build, { isElementLike } from "../index";

describe("isElementLike", () => {
  it("accepts a real React element", () => {
    expect(isElementLike(<div />)).to.equal(true);
  });

  it("rejects null and undefined", () => {
    expect(isElementLike(null)).to.equal(false);
    expect(isElementLike(undefined)).to.equal(false);
  });

  it("rejects strings, numbers, and functions", () => {
    expect(isElementLike("div")).to.equal(false);
    expect(isElementLike(42)).to.equal(false);
    expect(isElementLike(() => null)).to.equal(false);
  });

  it("rejects plain objects without $$typeof", () => {
    expect(isElementLike({ type: "div", props: {} })).to.equal(false);
  });

  // Regression: React 19 + RSC ship elements across the server/client
  // boundary. `React.isValidElement` may not recognise them when the
  // $$typeof symbol resolves through a different React copy, but the
  // object is structurally a React element. Treat it as element-like so
  // `build(rscElement)()` never passes the element itself as the *type*
  // to `createElement` (which produces "Element type is invalid … got:
  // object").
  it("accepts an element-shaped object with $$typeof and type", () => {
    const rscLikeElement = {
      $$typeof: Symbol.for("react.some.future.element"),
      type: "div",
      props: { className: "text-sm" },
      key: null,
    };
    expect(isElementLike(rscLikeElement)).to.equal(true);
  });
});

describe("build with element-like input (RSC regression)", () => {
  it("does not nest an element-like object as the element type", () => {
    const rscLikeElement = {
      $$typeof: Symbol.for("react.some.future.element"),
      type: "div",
      props: { className: "text-sm", children: "hello" },
      key: null,
    };
    const result = /**@type any*/ (build(rscLikeElement)());
    // The bug: build() used to wrap the input as createElement(element, {}),
    // producing an element whose .type is the original element object.
    expect(typeof result.type).to.not.equal("object");
  });

  it("returns a real React element unchanged when no props/child given", () => {
    const el = <div className="x" />;
    expect(build(el)()).to.equal(el);
  });
});
