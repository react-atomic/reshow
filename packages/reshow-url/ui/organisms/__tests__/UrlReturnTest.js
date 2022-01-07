import React, { PureComponent } from "react";
import { urlStore, urlDispatch, UrlReturn } from "../../../src/index";

import { expect } from "chai";
import { mount, cleanIt, jsdom } from "reshow-unit";

describe("Test Url Return", () => {
  beforeEach(() => {
    jsdom(null, { url: "http://localhost" });
    urlStore.reset();
  });

  afterEach(() => {
    cleanIt();
  });

  class TestEl extends PureComponent {
    show = 0;
    render() {
      this.show++;
      return <div />;
    }
  }

  class FakeComponent extends PureComponent {
    render() {
      const { urlKey } = this.props;
      return (
        <UrlReturn initStates={[urlKey]}>
          <TestEl ref={(el) => (this.el = el)} />
        </UrlReturn>
      );
    }
  }

  it("test get pathname", (done) => {
    const vDom = <FakeComponent urlKey=":pathname" />;
    const wrap = mount(vDom);
    const uFake = wrap.instance();
    urlDispatch({ type: "url", url: "http://localhost/aaa" });
    setTimeout(() => {
      wrap.update();
      expect(uFake.el.props[":pathname"]).to.deep.equal(["", "aaa"]);
      done();
    }, 5);
  });

  it("test get query", (done) => {
    const vDom = <FakeComponent urlKey="foo" />;
    const uFake = mount(vDom).instance();
    urlDispatch({ type: "query", params: { foo: "bar" } });
    setTimeout(() => {
      expect(uFake.el.props["foo"]).to.equal("bar");
      done();
    }, 5);
  });

  it("test trigger by history", (done) => {
    const vDom = <FakeComponent urlKey=":pathname" />;
    const uFake = mount(vDom).instance();
    urlStore.registerEvent(window);
    window.history.pushState(null, "title", "http://localhost/bbb");
    window.history.pushState(null, "title", "http://localhost/ccc");
    window.history.back();
    setTimeout(() => {
      expect(uFake.el.props[":pathname"]).to.deep.equal(["", "bbb"]);
      done();
    }, 5);
  });
});
