import React, { PureComponent } from "react";
import jsdom from "jsdom-global";
import { expect } from "chai";
import { urlDispatch } from "../../urlDispatcher";

describe("Test set New Url", () => {
  let reset;

  beforeEach(() => {
    reset = jsdom(null, { url: "http://localhost" });
  });

  afterEach(() => {
    reset();
  });

  it("test dispatch url from action", () => {
    expect(document.URL).to.equal("http://localhost/");
    urlDispatch({
      type: "url",
      url: "http://localhost/a"
    });
    expect(document.URL).to.equal("http://localhost/a");
  });


  it("test dispatch url from params", () => {
    expect(document.URL).to.equal("http://localhost/");
    urlDispatch('url', {url: 'http://localhost/b'});
    expect(document.URL).to.equal("http://localhost/b");
  });
});
