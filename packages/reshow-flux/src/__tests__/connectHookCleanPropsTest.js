import React, { Component, StrictMode } from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import connectHook from "../connectHook";
import { Dispatcher, ReduceStore } from "../index";

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
    const Foo = (props) => <div {...props} />;
    const FooHook = connectHook(Foo, {
      calculateState: (prevState, props) => {
        return store.getState();
      },
      getStores: (props) => [store],
    });
    class Bar extends Component {
      state = {
        p: null,
      };
      render() {
        return <FooHook {...this.state.p} />;
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
        wrap.unmount();
      }, 50);
    }, 50);
  });
});
