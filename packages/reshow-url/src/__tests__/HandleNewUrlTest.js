import React, { PureComponent } from "react";
import { expect } from "chai";
import {mount, cleanIt, jsdom} from "reshow-unit";

jsdom(null, { url: "http://localhost" });
import { AjaxPage, ajaxDispatch } from "organism-react-ajax";
import urlStore from "../stores/urlStore";

describe("Test Handle New Url", () => {
  let wrap;
  after(() => {
    ajaxDispatch({ onUrlChange: null });
    cleanIt();
  });
  class FakeComponent extends PureComponent {
    render() {
      return (
        <AjaxPage
          win={window}
          onUrlChange={this.props.onUrlChange}
          themes={{ fake: <div /> }}
          themePath="fake"
        />
      );
    }
  }

  it("test history back", (done) => {
    const myUpdate = () => {
      expect(true).to.be.true;
      done();
    };
    const vDom = <FakeComponent onUrlChange={myUpdate} />;
    wrap = mount(vDom);
    const uFake = wrap.instance();
    window.history.pushState(null, "title", "http://localhost/bbb");
    window.history.pushState(null, "title", "http://localhost/ccc");
    setTimeout(() => window.history.back());
  });
});
