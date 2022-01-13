import React, { Component } from "react";
import { expect } from "chai";
import { mount, hideConsoleError, cleanIt } from "reshow-unit";
import { createReducer } from "reshow-flux-base";

import useConnect from "../useConnect";

describe("Test Connect Hook", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action);
  });

  it("basic test", (done) => {
    const [store, dispatch] = reducer;
    const Foo = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {
          return store.getState();
        },
      })(props);
      return <div className={state.foo} />;
    };

    const wrap = mount(<Foo />);
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

  it("test Warnings for some updates during render", (done) => {
    const [store, dispatch] = reducer;
    /**
     * https://fb.me/setstate-in-render
     * https://reactjs.org/blog/2020/02/26/react-v16.13.0.html#warnings-for-some-updates-during-render
     */
    let init = 0;
    const Foo = (props) => {
      const state = useConnect({
        storeLocator: () => store,
        calculateState: (prevState, props) => {
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
      componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
      }
      render() {
        return <Foo />;
      }
    }
    const wrap = mount(<VDom />);
    setTimeout(() => {
      expect(wrap.html()).to.equal('<div class="bar"></div>');
      done();
    });
  });
});

describe("Test Connect Hook", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action);
    hideConsoleError();
  });

  afterEach(() => {
    cleanIt();
  });

  it("test store not defined", () => {
    const [store, dispatch] = reducer;
    const Foo = (props) => {
      const state = useConnect({
        calculateState: (prevState, props) => {
          return store.getState();
        },
      })(props);
      return <div className={state.foo} />;
    };

    expect(() => {
      mount(<Foo />);
    }).to.throw();
  });
});
