// @ts-check

import * as React from "react";
const { Component } = React;
import { createReducer } from "reshow-flux-base";
import { expect } from "chai";
import { act, render, screen } from "reshow-unit";

import useConnect from "../useConnect";

describe("Test Connect hook for more test", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((_state, action) => action, {});
  });

  it("could register with store", async () => {
    const [store, dispatch] = reducer;
    const FakeComponent = (/**@type any*/ props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: () => {
          return {
            foo: store.getState().foo,
          };
        },
      })(props);
      return <div role="udom">{state.foo}</div>;
    };
    render(<FakeComponent />);
    await act(() => dispatch({ foo: "bar" }), 5);
    expect(screen().getByRole("udom").outerHTML).to.equal(
      `<div role="udom">bar</div>`
    );
  });

  it("could work with dispatcher", async () => {
    let calculateTimes = 0;
    let wrap;
    const [store, dispatch] = reducer;
    const FakeComponent = (/**@type any*/ props) => {
      let state;
      state = useConnect({
        storeLocator: () => store,
        calculateState: () => {
          const state = store.getState();
          calculateTimes++;
          return { aaa: state.aaa };
        },
      })(props);
      return <div role="udom">{state.aaa}</div>;
    };
    expect(calculateTimes).to.equal(0);
    await act(() => (wrap = render(<FakeComponent />)));
    expect(calculateTimes >= 2).to.be.true; //init and handlchange
    await act(() => {
      dispatch({ aaa: "Hello dispatcher!" });
    }, 5);
    const dispatchCalculateTimes = calculateTimes;
    expect(dispatchCalculateTimes >= 3).to.be.true;
    expect(screen().getByRole("udom").outerHTML).to.equal(
      `<div role="udom">Hello dispatcher!</div>`
    );
    await act(() => wrap.unmount());
    dispatch({ aaa: "Hello Unmount!" });
    expect(calculateTimes).to.equal(dispatchCalculateTimes);
  });

  it("could work withProps", async () => {
    let getStoresProps = null;
    let calculateStateProps = null;
    const [store] = reducer;
    const FakeComponent = (/**@type any*/ props) => {
      const state = useConnect({
        storeLocator: (props) => {
          getStoresProps = props;
          return store;
        },
        calculateState: (_prevState, props) => {
          calculateStateProps = { ...props };
          return { foo: props.foo };
        },
      })(props);
      return <div role="udom">{state.foo}</div>;
    };

    let changeFoo;
    class Parent extends Component {
      state = {};

      constructor(/**@type any*/ props) {
        super(props);
        changeFoo = (/**@type any*/ v) => {
          this.setState({ foo: v });
        };
      }

      render() {
        let foo = null;
        if (this.state && this.state.foo) {
          foo = this.state.foo;
        }
        return <FakeComponent foo={foo} renewProps />;
      }
    }
    render(<Parent />);

    expect(getStoresProps).to.deep.include({ foo: null });
    expect(calculateStateProps).to.deep.include({ foo: null });
    await act(() => changeFoo("bar"));
    expect(screen().getByRole("udom").outerHTML).to.equal(
      `<div role="udom">bar</div>`
    );
    expect(getStoresProps).to.deep.include({ foo: "bar" });
    expect(calculateStateProps).to.deep.include({ foo: "bar" });
  });

  it("could work with empty calculateState", () => {
    const [store] = reducer;
    const FakeComponent = (/**@type any*/ props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: () => {},
      })(props);
      return <div role="udom" data-foo={state.foo} data-bar={props.bar} />;
    };

    render(<FakeComponent bar="bbb" />);
    expect(screen().getByRole("udom").outerHTML).to.equal(
      `<div role="udom" data-bar="bbb"></div>`
    );
  });
});
