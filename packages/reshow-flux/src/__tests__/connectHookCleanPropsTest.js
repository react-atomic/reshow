import React, { Component, StrictMode } from "react";
import { Dispatcher } from "reshow-flux-base";
import { expect } from "chai";
import { mount } from "reshow-unit";

import useConnect from "../useConnect";
import ReduceStore from "../ReduceStore";

describe("Connect Hook (clean Props)", () => {
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
  it("test clean props", (done) => {
    const Foo = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {
          return store.getState();
        },
      })(props);
      const { storeLocator, ...otherProps } = props;
      return <div {...{ ...otherProps, ...state }} />;
    };

    class Bar extends Component {
      state = {
        p: null,
      };
      render() {
        return <Foo {...this.state.p} />;
      }
    }
    const wrap = mount(<Bar />);
    wrap.setState({ p: { foo: "a", bar: "b" } });
    wrap.update();
    setTimeout(() => {
      expect(wrap.html()).to.equal('<div foo="a" bar="b"></div>');
      wrap.setState({ p: { bar: "c" } });
      setTimeout(() => {
        expect(wrap.html()).to.equal('<div bar="c"></div>');
        done();
      }, 1);
    }, 1);
  });
});
