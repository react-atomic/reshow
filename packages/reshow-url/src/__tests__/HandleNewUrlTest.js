import React from "react";
import { expect } from "chai";
import { render, cleanIt, jsdom } from "reshow-unit";
jsdom(null, { url: "http://localhost" });
import { AjaxPage, ajaxDispatch } from "organism-react-ajax";

describe("Test Handle New Url", () => {
  after(() => {
    ajaxDispatch({ onUrlChange: null });
    cleanIt();
  });

  it("test history back", (done) => {
    const myUpdate = () => {
      expect(true).to.be.true;
      done();
    };
    ajaxDispatch({ onUrlChange: myUpdate });
    render(
      <AjaxPage win={window} themes={{ fake: <div /> }} themePath="fake" />
    );
    window.history.pushState(null, "title", "http://localhost/bbb");
    window.history.pushState(null, "title", "http://localhost/ccc");
    setTimeout(() => window.history.back());
  });
});
