import jsdom from "jsdom-global";
import React, { PureComponent } from "react";
import { expect } from "chai";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

let uGlobal = jsdom(null, { url: "http://localhost" });
import { AjaxPage, ajaxDispatch } from "organism-react-ajax";
import urlStore from "../stores/urlStore";

describe("Test Handle New Url", () => {
  let wrap;
  after(() => {
    uGlobal();
    jsdom();
    wrap.unmount();
    ajaxDispatch({ onUrlChange: null });
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
