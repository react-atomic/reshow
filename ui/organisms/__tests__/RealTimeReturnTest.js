import React, { PureComponent } from "react";
import { RealTimeReturn, dispatch } from "../../../src/index";

import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

class TestEl extends PureComponent {
  render() {
    return <div />;
  }
}

class FakeComponent extends PureComponent {
  render() {
    const { realTimeReset } = this.props;
    return (
      <RealTimeReturn realTimeReset={realTimeReset} realTimePath={["r"]}>
        <TestEl ref={(el) => (this.el = el)} />
      </RealTimeReturn>
    );
  }
}

describe("Test RealTimeReturn", () => {
  let uWrap;

  afterEach(() => {
    cleanIt();
    dispatch("config/reset");
  });

  it("dispatch pageStore first", (done) => {
    const vDom = <FakeComponent />;
    uWrap = mount(vDom);
    dispatch({ data: "foo" });
    setTimeout(() => {
      uWrap.update();
      const uFake = uWrap.instance();
      expect(uFake.el.props.data).to.equal("foo");
      dispatch({ type: "realTime", params: { r: { data: "bar" } } });
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal("bar");
        done();
      }, 100);
    }, 50);
  });

  it("dispatch realtime first", (done) => {
    const vDom = <FakeComponent />;
    uWrap = mount(vDom);
    const uFake = uWrap.instance();
    dispatch({ type: "realTime", params: { r: { data: "bar" } } });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal("bar");
      dispatch({ data: "foo" });
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal("bar");
        done();
      }, 100);
    }, 50);
  });

  it("test realtime reset", (done) => {
    const vDom = <FakeComponent realTimeReset={true} />;
    uWrap = mount(vDom);
    const uFake = uWrap.instance();
    dispatch({ type: "realTime", params: { r: { data: "bar" } } });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal("bar");
      dispatch({ data: "foo" });
      setTimeout(() => {
        expect(uFake.el.props.data).to.be.null;
        done();
      }, 100);
    }, 50);
  });
});
