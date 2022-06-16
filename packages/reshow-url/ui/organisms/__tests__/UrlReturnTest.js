import React, { PureComponent } from "react";
import { urlStore, urlDispatch, UrlReturn } from "../../../src/index";

import { expect } from "chai";
import { act, render, cleanIt, jsdom, waitFor } from "reshow-unit";

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

  let uFake;
  class FakeComponent extends PureComponent {
    constructor(props) {
      super(props);
      uFake = this;
    }
    render() {
      const { urlKey } = this.props;
      return (
        <UrlReturn initStates={[urlKey]}>
          <TestEl ref={(el) => (this.el = el)} />
        </UrlReturn>
      );
    }
  }

  it("test get pathname", async () => {
    render(<FakeComponent urlKey=":pathname" />);
    await act(
      () => urlDispatch({ type: "url", url: "http://localhost/aaa" }),
      5
    );
    expect(uFake.el.props[":pathname"]).to.deep.equal(["", "aaa"]);
  });

  it("test get query", async () => {
    render(<FakeComponent urlKey="foo" />);
    await act(() => urlDispatch({ type: "query", params: { foo: "bar" } }), 5);
    await waitFor(()=>expect(uFake.el.props["foo"]).to.equal("bar"));
  });

  it("test trigger by history", async () => {
    await act(() => render(<FakeComponent urlKey=":pathname" />), 5);
    urlStore.registerEvent(window);
    window.history.pushState(null, "title", "http://localhost/bbb");
    window.history.pushState(null, "title", "http://localhost/ccc");
    window.history.back();
    waitFor(() => {
      expect(uFake.el.props[":pathname"]).to.deep.equal(["", "bbb"]);
    });
  });
});
