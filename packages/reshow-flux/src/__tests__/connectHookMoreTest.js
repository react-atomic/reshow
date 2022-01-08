import React, { Component, StrictMode } from "react";
import { createReducer } from "reshow-flux-base";
import { expect } from "chai";
import { mount } from "reshow-unit";

import useConnect from "../useConnect";

describe("Test Connect hook for more test", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action, {});
  });

  it("could register with store", (done) => {
    const [store, dispatch] = reducer;
    const FakeComponent = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {
          return {
            foo: store.getState().foo,
          };
        },
      })(props);
      return <div>{state.foo}</div>;
    };
    const wrap = mount(<FakeComponent />);
    dispatch({ foo: "bar" });
    setTimeout(() => {
      expect(wrap.html()).to.equal("<div>bar</div>");
      done();
    });
  });

  it("could work with dispatcher", (done) => {
    const [store, dispatch] = reducer;
    let calculateTimes = 0;
    const FakeComponent = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {
          const state = store.getState();
          calculateTimes++;
          return { aaa: state.aaa };
        },
      })(props);
      return <div>{state.aaa}</div>;
    };
    expect(calculateTimes).to.equal(0);
    const wrap = mount(<FakeComponent />);
    setTimeout(() => {
      expect(calculateTimes).to.equal(2); //init and handlchange
      dispatch({ aaa: "Hello dispatcher!" });
      setTimeout(() => {
        wrap.update();
        expect(calculateTimes).to.equal(3);
        expect(wrap.html()).to.equal("<div>Hello dispatcher!</div>");
        wrap.unmount();
        dispatch({ aaa: "Hello Unmount!" });
        expect(calculateTimes).to.equal(3);
        done();
      });
    });
  });

  it("could work withProps", (done) => {
    let getStoresProps = null;
    let calculateStateProps = null;
    const [store, dispatch] = reducer;
    const FakeComponent = (props) => {
      const state = useConnect({
        storeLocator: (props) => {
          getStoresProps = props;
          return store;
        },
        calculateState: (prevState, props) => {
          calculateStateProps = { ...props };
          return { foo: props.foo };
        },
      })(props);
      return <div>{state.foo}</div>;
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
        return <FakeComponent foo={foo} changeable />;
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
    const [store, dispatch] = reducer;
    const FakeComponent = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {},
      })(props);
      return <div>{state.foo}</div>;
    };

    const wrap = mount(<FakeComponent aaa="bbb" />);
    const props = wrap.props();
    expect(props).to.deep.include({
      aaa: "bbb",
    });
  });
});
