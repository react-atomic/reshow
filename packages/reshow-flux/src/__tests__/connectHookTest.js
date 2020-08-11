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

  it("basic test", (done) => {
    const Foo = (props) => {
      return <div className={props.foo} />;
    };
    const FooHook = connectHook(Foo, {
      calculateState: (prevState, props) => {
        return store.getState();
      },
      getStores: (props) => [store],
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
      if (init <= 1) {
        dispatch.warning = true;
        dispatch({ foo: "bar" });
      }
      init++;
      return <div className={props.foo}></div>;
    };
    const FooHook = connectHook(Foo, {
      calculateState: (prevState, props) => {
        return store.getState();
      },
      getStores: (props) => [store],
    });
    class VDom extends Component {
      componentDidCatch(error, errorInfo) {
        console.log({error, errorInfo});
      }
      render() {
        return <FooHook />;
      }
    }
    const wrap = mount(<VDom />);
    setTimeout(() => {
      expect(wrap.html()).to.equal(
        '<div class="bar"></div>'
      );
      done();
    }, 50);
  });
});
