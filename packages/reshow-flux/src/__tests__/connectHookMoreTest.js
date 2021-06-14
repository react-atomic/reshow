import React, { Component, StrictMode } from "react";
import { Dispatcher, CHANGE } from "reshow-flux-base";
import { expect } from "chai";
import { mount } from "reshow-unit";

import useConnect from "../useConnect";
import ReduceStore from "../ReduceStore";

describe("Test Connect hook for more test", () => {
  class FakeStore extends ReduceStore {
    getInitialState() {
      return { foo: "bar" };
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

  it("could register with store", (done) => {
    const FakeComponent = (props) => {
      const state = useConnect({
        calculateState: (prevState, props) => {
          return {
            foo: store.getState().foo,
          };
        },
      })(props);
      return <div>{state.foo}</div>;
    };

    FakeComponent.defaultProps = {
      storeLocator: () => store,
    };

    const wrap = mount(<FakeComponent />);
    store.emit(CHANGE);
    setTimeout(() => {
      expect(wrap.html()).to.equal("<div>bar</div>");
      done();
    }, 50);
  });

  it("could work with dispatcher", (done) => {
    let calculateTimes = 0;

    const FakeComponent = (props) => {
      const state = useConnect({
        calculateState: (prevState, props) => {
          const state = store.getState();
          calculateTimes++;
          return { aaa: state.aaa };
        },
        getStores: (props) => [store],
      })(props);
      return <div>{state.aaa}</div>;
    };

    FakeComponent.defaultProps = {
      storeLocator: () => store,
    };

    expect(calculateTimes).to.equal(0);
    const html = mount(<FakeComponent />);
    setTimeout(() => {
      expect(calculateTimes).to.equal(2); //init and handlchange
      dispatch({ aaa: "Hello dispatcher!" });
      setTimeout(() => {
        html.update();
        expect(calculateTimes).to.equal(3);
        expect(html.html()).to.equal("<div>Hello dispatcher!</div>");
        dispatch({ aaa: "Hello Unmount!" });
        expect(calculateTimes).to.equal(3);
        done();
      }, 50);
    }, 50);
  });

  it("could work withProps", (done) => {
    let getStoresProps = null;
    let calculateStateProps = null;

    const FakeComponent = (props) => {
      const state = useConnect({
        calculateState: (prevState, props) => {
          calculateStateProps = { ...props };
          return { foo: props.foo };
        },
      })(props);
      return <div>{state.foo}</div>;
    };

    FakeComponent.defaultProps = {
      storeLocator: (props) => {
        getStoresProps = props;
        return store;
      },
    };
    let changeFoo;
    class Parent extends Component {
      state = {};

      constructor(props) {
        super(props);
        changeFoo = (v) => {
          this.setState({ foo: v });
        };
      }

      render() {
        let foo = null;
        if (this.state && this.state.foo) {
          foo = this.state.foo;
        }
        return <FakeComponent foo={foo} />;
      }
    }
    const wrap = mount(<Parent />);

    expect(getStoresProps).to.deep.include({ foo: null });
    expect(calculateStateProps).to.deep.include({ foo: null });
    changeFoo("bar");
    wrap.update();
    setTimeout(() => {
      expect(wrap.html()).to.equal("<div>bar</div>");
      expect(getStoresProps).to.deep.include({ foo: "bar" });
      expect(calculateStateProps).to.deep.include({ foo: "bar" });
      done();
    });
  });

  it("could work with empty calculateState", () => {
    const FakeComponent = (props) => {
      const state = useConnect({
        calculateState: (prevState, props) => {},
      })(props);
      return <div>{state.foo}</div>;
    };

    FakeComponent.defaultProps = {
      storeLocator: () => store,
    };

    const wrap = mount(<FakeComponent aaa="bbb" />);
    const props = wrap.props();
    expect(props).to.deep.include({
      aaa: "bbb",
    });
  });
});
