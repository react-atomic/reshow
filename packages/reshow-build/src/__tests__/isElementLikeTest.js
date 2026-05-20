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
  // to `createElement` ("Element type is invalid … got: object").
  it("accepts an element-shaped object with foreign $$typeof", () => {
    const rscLikeElement = {
      $$typeof: Symbol.for("react.some.future.element"),
      type: "div",
      props: { className: "text-sm" },
      key: null,
    };
    expect(isElementLike(rscLikeElement)).to.equal(true);
  });

  // Regression: Next.js App Router ships server children to client components
  // as bare `React.lazy` refs (no `.type`, no `.props`). `build()` must pass
  // them through untouched — wrapping a lazy as the *type* of an element
  // corrupts the render tree when the lazy resolves to a React element rather
  // than a component function.
  it("accepts a bare React.lazy-shaped ref (no `type` property)", () => {
    const bareLazy = {
      $$typeof: Symbol.for("react.lazy"),
      _payload: { _status: -1, _result: null },
      _init: () => null,
    };
    expect(isElementLike(bareLazy)).to.equal(true);
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
    // Bug behavior would set result.type to the original element object.
    expect(typeof result.type).to.not.equal("object");
  });

  it("returns a real React element unchanged when no props/child given", () => {
    const el = <div className="x" />;
    expect(build(el)()).to.equal(el);
  });

  it("returns a bare React.lazy ref unchanged when no props/child given", () => {
    // Before the fix: build() wrapped lazy as createElement(lazy, {}), placing
    // the lazy ref in the element's `type` slot. When that lazy resolved to a
    // React element (not a function) the renderer threw "got: object".
    const bareLazy = {
      $$typeof: Symbol.for("react.lazy"),
      _payload: { _status: -1, _result: null },
      _init: () => null,
    };
    expect(build(bareLazy)()).to.equal(bareLazy);
  });
});
