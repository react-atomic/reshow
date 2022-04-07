import { expect } from "chai";
import { Map, mergeMap } from "reshow-flux";
import { createReducer } from "reshow-flux-base";
import { render } from "reshow-unit";

import useReturn from "../useReturn";

describe("Test useReturn", () => {
  it("basic test", () => {
    const [store, dispatch] = createReducer((state, ation) => action, {
      foo: "bar",
    });
    const Dom = (props) => {
      const state = useReturn(["foo"], store);
      return state.foo;
    };
    const wrap = render(<Dom />);
    expect(wrap.html()).to.equal("bar");
  });

  it("test default immutable", () => {
    const [store, dispatch] = createReducer(
      (state, ation) => action,
      mergeMap(Map(), { m: {} })
    );
    const Dom = (props) => {
      const state = useReturn(["m"], store);
      expect(Map.isMap(state.m)).to.be.true;
      return null;
    };
    const wrap = render(<Dom />);
  });

  it("test default is not immutable", () => {
    const [store, dispatch] = createReducer(
      (state, ation) => action,
      mergeMap(Map(), { m: {} })
    );
    const Dom = (props) => {
      const state = useReturn(["m"], store, { immutable: false });
      expect(Map.isMap(state.m)).to.be.false;
      return null;
    };
    const wrap = render(<Dom />);
  });
});
