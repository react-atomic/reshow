import React, { Component } from "react";

import { expect } from "chai";
import { mount } from "reshow-unit";

import useConnect from "../useConnect";
import { Dispatcher, ReduceStore } from "../index";

describe("Test Connect Hook", () => {
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

  beforeEach(() => {
    dispatcher = new Dispatcher();
    dispatch = dispatcher.dispatch;
    store = new FakeStore(dispatcher);
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

    const wrap = mount(<Foo />);
    expect(wrap.html()).to.equal("<div></div>");
    const a = { foo: "111" };
    dispatch(a);
    setTimeout(() => {
      expect(wrap.html()).to.equal('<div class="111"></div>');
      dispatch({ foo: "222" });
      setTimeout(() => {
        expect(wrap.html()).to.equal('<div class="222"></div>');
        done();
      }, 50);
    }, 50);
  });

  it("test Warnings for some updates during render", (done) => {
    /**
     * https://fb.me/setstate-in-render
     * https://reactjs.org/blog/2020/02/26/react-v16.13.0.html#warnings-for-some-updates-during-render
     */
    let init = 0;
    const Foo = (props) => {
      const state = useConnect({
        calculateState: (prevState, props) => {
          return store.getState();
        },
      })(props);
      if (init <= 1) {
        dispatch({ foo: "bar" });
      }
      init++;
      return <div className={state.foo}></div>;
    };
    Foo.defaultProps = {
      storeLocator: () => store,
    };

    class VDom extends Component {
      componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
      }
      render() {
        return <Foo />;
      }
    }
    const wrap = mount(<VDom />);
    setTimeout(() => {
      expect(wrap.html()).to.equal('<div class="bar"></div>');
      done();
    }, 50);
  });
});
