import React, { PureComponent } from "react";

import { expect } from "chai";
import { mount } from "reshow-unit";
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

  it("basic test", (done) => {
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

    class FakeComponent extends PureComponent {
      state = { show: true };
      set(k, v) {
        this.setState({ [k]: v });
      }

      render() {
        if (this.state.show) {
          return <Foo />;
        } else {
          return null;
        }
      }
    }

    const wrap = mount(<FakeComponent />);
    const oFake = wrap.instance();
    sandbox.spy(store, "removeListener");
    console.log("before unmount", store.removeListener.callCount);
    expect(store.removeListener.callCount).to.equal(0);
    oFake.set("show", false);
    expect(store.removeListener.callCount).to.equal(1);
    console.log("after unmount", store.removeListener.callCount);
    dispatch({});
    done();
  });
});
