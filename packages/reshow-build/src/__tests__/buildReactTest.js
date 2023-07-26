// @ts-check

import * as React from "react";
const { createElement, cloneElement } = React;
import { expect } from "chai";
import { render } from "reshow-unit";

import build from "../index";

describe("Test build react", () => {
  it("test with null props", () => {
    const wrap = render(build("div")(null, <span />));
    expect(wrap.html()).to.equal("<div><span></span></div>");
  });
  it("test with undefined props", () => {
    const wrap = render(build("div")(undefined, <span />));
    expect(wrap.html()).to.equal("<div><span></span></div>");
  });
  it("should have same behavior with createElement", () => {
    expect(render(build("div")(null, "span")).html()).to.equal(
      render(createElement("div", null, "span")).html()
    );
  });
  it("should have same behavior with cloneElement", () => {
    expect(render(build(<div />)(null, "span")).html()).to.equal(
      render(cloneElement(<div />, undefined, "span")).html()
    );
  });
});
