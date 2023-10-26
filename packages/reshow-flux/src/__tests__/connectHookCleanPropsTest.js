// @ts-check

import * as React from "react";
const { Component } = React;
import { createReducer } from "reshow-flux-base";
import { expect } from "chai";
import { act, render, screen } from "reshow-unit";
import callfunc from "call-func";

import useConnect from "../useConnect";

describe("Connect Hook (clean Props)", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((_state, action) => action, {});
  });

  it("test clean props", async () => {
    const [store] = reducer;
    const Foo = (/**@type any*/ props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: () => {
          return store.getState();
        },
      })(props);
      const { storeLocator, ...otherProps } = props;
      return <div role="udom" {...{ ...otherProps, ...state }} />;
    };

    /**
     * @type any
     */
    const setState = { current: null };

    class Bar extends Component {
      constructor(/**@type any*/ props) {
        super(props);
        setState.current = (/**@type any[]*/ ...p) => {
          callfunc(this.setState, p, this);
        };
      }
      state = {
        /**
         * @type any
         */
        p: null,
      };
      render() {
        return <Foo {...this.state.p} />;
      }
    }
    render(<Bar />);
    await act(() => {
      setState.current({ p: { foo: "a", bar: "b" } });
    }, 5);
    expect(screen().getByRole("udom").outerHTML).to.equal(
      '<div role="udom" foo="a" bar="b"></div>'
    );
    await act(() => {
      setState.current({ p: { bar: "c" } });
    }, 5);
    expect(screen().getByRole("udom").outerHTML).to.equal(
      '<div role="udom" bar="c"></div>'
    );
  });
});
