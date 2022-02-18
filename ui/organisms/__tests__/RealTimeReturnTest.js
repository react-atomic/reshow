import React, { PureComponent } from "react";

import { expect } from "chai";
import { mount, cleanIt } from "reshow-unit";
import { REAL_TIME_DATA_KEY } from "reshow-constant";

import { RealTimeReturn, Return, dispatch } from "../../../src/index";

class TestEl extends PureComponent {
  render() {
    const props = { ...this.props };
    return <div {...props} />;
  }
}

class FakeComponent extends PureComponent {
  render() {
    const { realTimeReset } = this.props;
    return (
      <Return>
        <RealTimeReturn realTimeReset={realTimeReset}>
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
      dispatch({ type: "realTime", params: { [REAL_TIME_DATA_KEY]: { data: "bar" } } });
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal("bar");
        done();
      }, 5);
    }, 5);
  });

  it("dispatch Realtime State first and not reset", (done) => {
    uWrap = mount(<FakeComponent />);
    const uFake = uWrap.instance();
    dispatch({ type: "realTime", params: { [REAL_TIME_DATA_KEY]: { data: "bar" } } });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal("bar");
      dispatch("realTime");
      dispatch({ data: "foo" });
      setTimeout(() => {
        expect(uFake.el.props.data).to.equal("bar");
        done();
      }, 5);
    }, 5);
  });

  it("test realtime reset", (done) => {
    uWrap = mount(<FakeComponent realTimeReset={true} />);
    const uFake = uWrap.instance();
    dispatch({ type: "realTime", params: { [REAL_TIME_DATA_KEY]: { data: "bar" } } });
    setTimeout(() => {
      expect(uFake.el.props.data).to.equal("bar");
      dispatch("realTime");
      dispatch({ data: "foo" });
      setTimeout(() => {
        expect(uFake.el.props.data).to.be.null;
        done();
      }, 5);
    }, 5);
  });
});
