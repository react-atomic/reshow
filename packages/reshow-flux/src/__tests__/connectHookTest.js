import React, { Component } from "react";

import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

import connectHook from "../connectHook";
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

  it("basic test", done => {
    const Foo = props => {
      return <div className={props.foo} />;
    };
    const stores = [store];
    const FooHook = connectHook(Foo, {
      calculateState: (prevState, props) => {
        return store.getState();
      },
      getStores: props => stores
    });
    const wrap = mount(<FooHook />);
    expect(wrap.html()).to.equal("<div></div>");
    const a = { foo: "111" };
    dispatch(a);
    setTimeout(() => {
      expect(wrap.html()).to.equal('<div class="111"></div>');
      dispatch({ foo: "222" });
      setTimeout(() => {
        expect(wrap.html()).to.equal('<div class="222"></div>');
        done();
      });
    });
  });

  it("test clean props", done => {
    const Foo = props => {
      return <div {...props} />;
    };
    const stores = [store];
    const FooHook = connectHook(Foo, {
      calculateState: (prevState, props) => {
        return store.getState();
      },
      getStores: props => stores
    });
    class Bar extends Component {
      state = {
        p: null
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
      });
    });
  });
});
