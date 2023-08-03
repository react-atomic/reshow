// @ts-check

import * as React from "react";
const { Component } = React;
import { expect } from "chai";
import { act, render, hideConsoleError, cleanIt, waitFor } from "reshow-unit";
import { createReducer } from "reshow-flux-base";

import useConnect from "../useConnect";

describe("Test Connect Hook", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((_state, action) => action);
  });

  it("basic test", async () => {
    const [store, dispatch] = reducer;
    const Foo = (/**@type any*/ props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: () => {
          return store.getState();
        },
      })(props);
      return <div className={state.foo} />;
    };

    const wrap = render(<Foo />);
    expect(wrap.html()).to.equal(`<div></div>`);
    const a = { foo: "111" };
    await act(() => dispatch(a), 5);
    await waitFor(() => {
      expect(wrap.html()).to.equal('<div class="111"></div>');
    });
    await act(() => dispatch({ foo: "222" }));
    await waitFor(() => {
      expect(wrap.html()).to.equal('<div class="222"></div>');
    });
  });

  it("test Warnings for some updates during render", async () => {
    const [store, dispatch] = reducer;
    /**
     * https://fb.me/setstate-in-render
     * https://reactjs.org/blog/2020/02/26/react-v16.13.0.html#warnings-for-some-updates-during-render
     */
    let init = 0;
    const Foo = (/**@type any*/ props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: () => {
          return store.getState();
        },
      })(props);
      if (init <= 1) {
        dispatch({ foo: "bar" });
      }
      init++;
      return <div className={state.foo}></div>;
    };

    class VDom extends Component {
      componentDidCatch(/**@type any*/ error, /**@type any*/ errorInfo) {
        console.log({ error, errorInfo });
      }
      render() {
        return <Foo />;
      }
    }
    await act();
    const wrap = render(<VDom />);
    const html = wrap.html();
    expect(html).to.equal('<div class="bar"></div>');
    wrap.unmount();
  });
});

describe("Test Connect Hook with store", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((_state, action) => action);
    hideConsoleError();
  });

  afterEach(() => {
    cleanIt();
  });

  it("test store not defined", () => {
    const [store] = reducer;
    const Foo = (/**@type any*/ props) => {
      const state = useConnect({
        calculateState: () => {
          return store.getState();
        },
      })(props);
      return <div className={state.foo} />;
    };

    expect(() => {
      render(<Foo />);
    }).to.throw();
  });
});
