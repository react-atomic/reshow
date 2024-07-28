//@ts-check
import * as React from "react";

import { expect } from "chai";
import { render } from "reshow-unit";

import build from "../index";

describe("Test string render", () => {
  it("test build string", () => {
    const vdom = /**@type React.ReactElement*/ (build("Foo Bar")());
    const actual = render(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build string with child", () => {
    const vdom = /**@type React.ReactElement*/ (build("Foo Bar")({}, <div />));
    const actual = render(vdom).html();
    expect(actual).to.equal("<span>Foo Bar</span>");
  });

  it("test build string with params has child", () => {
    const run = () => {
      const vdom = /**@type React.ReactElement*/ (
        build("Foo Bar")({ children: <div /> })
      );
      render(vdom).html();
    };
    expect(run).throw(TypeError);
  });
});
