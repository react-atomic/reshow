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

  for (let i = 1, j = 7; i < j; i++) {
    it(`test render h${i}`, () => {
      const vdom = /**@type React.ReactElement*/ (build(`h${i}`)());
      const actual = render(vdom).html();
      expect(actual).to.equal(`<h${i}></h${i}>`);
    });
  }

  [0, 7, 8, 9].forEach((i) => {
    it(`test render h${i}`, () => {
      const vdom = /**@type React.ReactElement*/ (build(`h${i}`)());
      const actual = render(vdom).html();
      expect(actual).to.equal(`<span>h${i}</span>`);
    });
  });
});
