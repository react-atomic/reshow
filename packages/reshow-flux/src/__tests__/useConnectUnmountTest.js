//@ts-check
import * as React from "react";
const { PureComponent } = React;

import { expect } from "chai";
import { render, act } from "reshow-unit";
import * as sinon from "sinon";
import { createReducer } from "reshow-flux-base";

import useConnect from "../useConnect";

describe("useConnect Unmount Test", () => {
  const sandbox = sinon.createSandbox();
  let reducer;
  beforeEach(() => {
    reducer = createReducer((_state, action) => action, {});
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("basic test", async () => {
    const [store, dispatch] = reducer;
    const Foo = (/**@type any*/ props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: () => {
          return store.getState();
        },
      })(props);
      return <div className={state.foo} />;
    };

    const oFake = {};

    class FakeComponent extends PureComponent {
      state = { show: true };
      constructor(/**@type any*/ props) {
        super(props);
        oFake.set = (/**@type any*/ k, /**@type any*/ v) => {
          // @ts-ignore
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

    render(<FakeComponent />);
    sandbox.spy(store, "removeListener");
    console.log("before unmount", store.removeListener.callCount);
    expect(store.removeListener.callCount).to.equal(0);
    await act(() => oFake.set("show", false));
    expect(store.removeListener.callCount).to.equal(1);
    console.log("after unmount", store.removeListener.callCount);
    dispatch({});
  });
});
