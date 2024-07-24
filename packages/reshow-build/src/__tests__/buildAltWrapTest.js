//@ts-check

import * as React from "react";

import { expect } from "chai";
import { render } from "reshow-unit";

import build from "../index";

describe("Test altWrap", () => {
  it("test build with altWrap", () => {
    const FakeDom = () => {
      return build("test", { altWrap: <div /> })();
    };
    const wrap = render(<FakeDom />);
    expect(wrap.html()).to.equal("<div>test</div>");
  });

  it("test altWrap after function call", () => {
    const FakeDom = () => {
      return build(() => "after-func-call", {
        altWrap: "div",
        doCallFunction: true,
      })({ "data-foo": "bar" });
    };
    const wrap = render(<FakeDom />);
    expect(wrap.html()).to.equal('<div data-foo="bar">after-func-call</div>');
  });

  it("test altWrap after function call and unset props", () => {
    const FakeDom = () => {
      return build(
        (props) => {
          delete props["data-foo"];
          return "after-func-call";
        },
        {
          altWrap: "div",
          doCallFunction: true,
        },
      )({ "data-foo": "foo", "data-bar": "bar" });
    };
    const wrap = render(<FakeDom />);
    expect(wrap.html()).to.equal('<div data-bar="bar">after-func-call</div>');
  });
});
