import React, { Component, StrictMode } from "react";
import { createReducer } from "reshow-flux-base";
import { expect } from "chai";
import { mount } from "reshow-unit";

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
      });
    });
  });
});
