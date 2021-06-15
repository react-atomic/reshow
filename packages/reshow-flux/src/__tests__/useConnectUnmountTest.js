import React, { PureComponent } from "react";

import { expect } from "chai";
import { mount } from "reshow-unit";
import sinon from "sinon";

import useConnect from "../useConnect";
import { Dispatcher, ReduceStore } from "../index";

describe("useConnect Unmount Test", () => {
  class FakeStore extends ReduceStore {
    getInitialState() {
      return {};
    }

    reduce(state, action) {
      return action;
    }
  }

  let dispatcher;
  let dispatch;
  let store;
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    dispatcher = new Dispatcher();
    dispatch = dispatcher.dispatch;
    store = new FakeStore(dispatcher);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("basic test", (done) => {
    const Foo = (props) => {
      const state = useConnect({
        calculateState: (prevState, props) => {
          return store.getState();
        },
      })(props);
      return <div className={state.foo} />;
    };

    Foo.defaultProps = {
      storeLocator: () => store,
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
