import React, { PureComponent } from "react";
import { RealTimeReturn, Return, dispatch } from "../../../src/index";

import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";

class TestEl extends PureComponent {
  render() {
    const props = {...this.props};
    delete props["--realTimeUrl--"];
    return <div {...props} />;
  }
}

class FakeComponent extends PureComponent {
  render() {
    const { realTimeReset } = this.props;
    return (
      <Return>
        <RealTimeReturn realTimeReset={realTimeReset} realTimePath={["r"]}>
          <TestEl ref={(el) => (this.el = el)} />
        </RealTimeReturn>
      </Return>
    );
  }
}

describe("Test RealTimeReturn", () => {
  let uWrap;

  afterEach(() => {
    cleanIt();
    dispatch("config/reset");
  });

  it("dispatch Page State first", (done) => {
    uWrap = mount(<FakeComponent />);
    dispatch({ data: "foo" });
    setTimeout(() => {
      uWrap.update();
      const uFake = uWrap.instance();
      expect(uFake.el.props.data).to.equal("foo");
      dispatch({ type: "realTime", params: { r: { data: "bar" } } });
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal("bar");
        done();
      }, 5);
    }, 5);
  });

  it("dispatch Realtime State first", (done) => {
    uWrap = mount(<FakeComponent />);
    const uFake = uWrap.instance();
    dispatch({ type: "realTime", params: { r: { data: "bar" } } });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal("bar");
      dispatch({ data: "foo" });
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal("foo");
        done();
      }, 5);
    }, 5);
  });

  it("test realtime reset", (done) => {
    uWrap = mount(<FakeComponent realTimeReset={true} />);
    const uFake = uWrap.instance();
    dispatch({ type: "realTime", params: { r: { data: "bar" } } });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal("bar");
      dispatch({ data: "foo" });
      setTimeout(() => {
        expect(uFake.el.props.data).to.be.null;
        done();
      }, 5);
    }, 5);
  });
});
