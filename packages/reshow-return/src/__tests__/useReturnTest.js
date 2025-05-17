// @ts-check

import * as React from "react";
import { expect } from "chai";
import { render } from "reshow-unit";
import { Map, fromJS } from "reshow-flux";
import { createReducer } from "reshow-flux-base";

import useReturn from "../useReturn";

describe("Test useReturn", () => {
  it("basic test", () => {
    const [store] = createReducer(
      (/**@type Object<any, any>*/ _state, action) => action,
      {
        foo: "bar",
      }
    );
    const Dom = () => {
      /**@type Object<any, any>*/
      const state = useReturn(["foo"], store);
      return state.foo;
    };
    const wrap = render(<Dom />);
    expect(wrap.html()).to.equal("bar");
  });

  it("test default immutable", () => {
    const [store] = createReducer(
      (/**@type Object<any, any>*/ _state, action) => action,
      fromJS({ m: {} })
    );
    const Dom = () => {
      /**@type Object<any, any>*/
      const state = useReturn(["m"], store);
      expect(Map.isMap(state.m)).to.be.true;
      return null;
    };
    render(<Dom />);
  });

  it("test default is not immutable", () => {
    const [store] = createReducer(
      (/**@type Object<any, any>*/ _state, action) => action,
      fromJS({ m: {} })
    );
    const Dom = () => {
      /**@type Object<any, any>*/
      const state = useReturn(["m"], store, { immutable: false });
      expect(Map.isMap(state.m)).to.be.false;
      return null;
    };
    render(<Dom />);
  });
});
