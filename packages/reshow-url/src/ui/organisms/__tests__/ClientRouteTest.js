import React from "react";
import { expect } from "chai";
import { render, cleanIt, jsdom, act } from "reshow-unit";
import { pageStore } from "reshow";

import ClientRoute from "../ClientRoute";
import getUrlReducer from "../../../stores/urlStore";

describe("Test ClientRoute", () => {
  const { store: urlStore } = getUrlReducer();
  beforeEach(() => {
    jsdom(null, { url: "http://localhost" });
    urlStore.reset();
    pageStore.reset();
  });

  afterEach(() => {
    cleanIt();
  });

  it("basic test", () => {
    const vDom = <ClientRoute themePath="foo" themes={{ foo: "div" }} />;
    const wrap = render(vDom);
    const actual = wrap.html();
    expect(actual).to.have.string("div");
  });

  it("test should reset default theme to store", () => {
    const vDom = (
      <ClientRoute
        defaultThemePath="bar"
        themes={{ foo: "div", bar: "span" }}
      />
    );
    const wrap = render(vDom);
    const actual = wrap.html();
    act();
    expect(actual).to.have.string("span");
  });
});
