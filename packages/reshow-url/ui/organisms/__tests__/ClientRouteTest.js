import React, { PureComponent } from "react";
import { expect } from "chai";
import {mount, cleanIt, jsdom} from "reshow-unit";

import ClientRoute from "../ClientRoute";
import urlStore from "../../../src/stores/urlStore";

describe("Test ClientRoute", () => {

  beforeEach(() => {
    jsdom(null, { url: "http://localhost" });
    urlStore.reset();
  });

  afterEach(() => {
    cleanIt();
  });

  it("basic test", () => {
    const vDom = <ClientRoute themePath="foo" themes={{ foo: "div" }} />;
    const wrap = mount(vDom);
    const actual = wrap.html();
    expect(actual).to.have.string("div");
  });
});
