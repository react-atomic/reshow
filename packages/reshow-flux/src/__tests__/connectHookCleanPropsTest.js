import { Component, StrictMode } from "react";
import { createReducer } from "reshow-flux-base";
import { expect } from "chai";
import { act, render, screen } from "reshow-unit";

import useConnect from "../useConnect";

describe("Connect Hook (clean Props)", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action, {});
  });

  it("test clean props", (done) => {
    const [store, dispatch] = reducer;
    const Foo = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {
          return store.getState();
        },
      })(props);
      const { storeLocator, ...otherProps } = props;
      return <div role="udom" {...{ ...otherProps, ...state }} />;
    };

    const setState = { current: null };

    class Bar extends Component {
      constructor(props) {
        super(props);
        setState.current = (...p) => {
          this.setState(...p);
        };
      }
      state = {
        p: null,
      };
      render() {
        return <Foo {...this.state.p} />;
      }
    }
    render(<Bar />);
    act(() => {
      setState.current({ p: { foo: "a", bar: "b" } });
    });
    setTimeout(() => {
      expect(screen().getByRole("udom").outerHTML).to.equal(
        '<div role="udom" foo="a" bar="b"></div>'
      );
      act(() => {
        setState.current({ p: { bar: "c" } });
      });
      setTimeout(() => {
        expect(screen().getByRole("udom").outerHTML).to.equal(
          '<div role="udom" bar="c"></div>'
        );
        done();
      });
    });
  });
});
