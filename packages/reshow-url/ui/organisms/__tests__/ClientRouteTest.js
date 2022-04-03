import React, { PureComponent } from "react";
import { expect } from "chai";
import { render, cleanIt, jsdom } from "reshow-unit";
import { pageStore } from "reshow";

import ClientRoute from "../ClientRoute";
import urlStore from "../../../src/stores/urlStore";

describe("Test ClientRoute", () => {
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
    const vDom = <ClientRoute defaultThemePath="foo" themes={{ foo: "div" }} />;
    render(vDom);
    setTimeout(() => {
      expect(pageStore.getState().get("themePath")).to.equal("foo");
    });
  });
});
