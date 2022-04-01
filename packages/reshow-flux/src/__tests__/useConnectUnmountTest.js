import React, { PureComponent } from "react";

import { expect } from "chai";
import { render, act } from "reshow-unit";
import sinon from "sinon";
import { createReducer } from "reshow-flux-base";

import useConnect from "../useConnect";

describe("useConnect Unmount Test", () => {
  const sandbox = sinon.createSandbox();
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action, {});
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("basic test", async () => {
    const [store, dispatch] = reducer;
    const Foo = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {
          return store.getState();
        },
      })(props);
      return <div className={state.foo} />;
    };

    const oFake = {};

    class FakeComponent extends PureComponent {
      state = { show: true };
      constructor(props) {
        super(props);
        oFake.set = (k, v) => {
          this.setState({ [k]: v });
        };
      }

      render() {
        if (this.state.show) {
          return <Foo />;
        } else {
          return null;
        }
      }
    }

    const wrap = render(<FakeComponent />);
    sandbox.spy(store, "removeListener");
    console.log("before unmount", store.removeListener.callCount);
    expect(store.removeListener.callCount).to.equal(0);
    await act(() => oFake.set("show", false));
    expect(store.removeListener.callCount).to.equal(1);
    console.log("after unmount", store.removeListener.callCount);
    dispatch({});
  });
});
