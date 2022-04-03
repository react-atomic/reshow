import React, { PureComponent } from "react";

import { expect } from "chai";
import { act, render, cleanIt } from "reshow-unit";
import { REAL_TIME_DATA_KEY } from "reshow-constant";

import { RealTimeReturn, Return, dispatch } from "../../../src/index";

class TestEl extends PureComponent {
  render() {
    const props = { ...this.props };
    return <div {...props} />;
  }
}

let uFake;
class FakeComponent extends PureComponent {
  constructor(props) {
    super(props);
    uFake = this;
  }
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
    dispatch("config/reset");
    cleanIt();
  });

  it("dispatch Page State first", async () => {
    uWrap = render(<FakeComponent />);
    await act(() => dispatch({ data: "foo" }), 3);
    expect(uFake.el.props.data).to.equal("foo");
    await act(() => {
      dispatch({
        type: "realTime",
        params: { [REAL_TIME_DATA_KEY]: { data: "bar" } },
      });
    }, 3);
    expect(uFake.el.props.data).to.equal("bar");
  });

  it("dispatch Realtime State first and not reset", async () => {
    uWrap = render(<FakeComponent />);
    await act(() =>
      dispatch({
        type: "realTime",
        params: { [REAL_TIME_DATA_KEY]: { data: "bar" } },
      })
    );
    expect(uFake.el.props.data).to.equal("bar");
    dispatch("realTime");
    act(() => dispatch({ data: "foo" }));
    expect(uFake.el.props.data).to.equal("bar");
  });

  it("test realtime reset", async () => {
    uWrap = render(<FakeComponent realTimeReset={true} />);
    await act(() =>
      dispatch({
        type: "realTime",
        params: { [REAL_TIME_DATA_KEY]: { data: "bar" } },
      }),
      5
    );
    expect(uFake.el.props.data).to.equal("bar");
    dispatch("realTime");
    await act(()=>dispatch({ data: "foo" }), 5);
    expect(uFake.el.props.data).to.be.null;
  });
});
