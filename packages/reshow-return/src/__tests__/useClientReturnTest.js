// @ts-check

import { expect } from "chai";
import { render } from "reshow-unit";
import { createReducer } from "reshow-flux-base";
import * as React from "react";

import useClientReturn from "../useClientReturn";

describe("Test useClientReturn", () => {

  it("basic test", () => {
    const [store] = createReducer((_state, action) => action, {
      foo: "bar",
    });
    const Dom = () => {
      const state = useClientReturn(["foo"], store);
      return state.foo;
    };
    const wrap = render(<Dom />);
    expect(wrap.html()).to.equal("bar");
  });


});
