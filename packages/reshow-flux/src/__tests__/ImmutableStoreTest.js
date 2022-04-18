import { expect } from "chai";

import ImmutableStore, { Map, mergeMap } from "../ImmutableStore";

describe("Test ImmutableStore", () => {
  let reducer;
  beforeEach(() => {
    reducer = ImmutableStore((state, action) => mergeMap(state, action));
  });

  it("test merge map", () => {
    const [store, dispatch] = reducer;
    const action = { aaa: { bbb: "ccc" } };
    dispatch(action);
    const state = store.getState();
    expect(Map.isMap(state.get("aaa"))).to.be.true;
    expect(state.get("aaa").toJS()).to.deep.equal({ bbb: "ccc" });
  });

  it("test get map", () => {
    const [store, dispatch] = reducer;
    const action = { aaa: { bbb: "ccc" } };
    dispatch(action);
    expect(store.getMap("aaa")).to.deep.equal({ bbb: "ccc" });
  });

  [true, false, 0, null, undefined, ""].forEach((v) => {
    it(`test set empty [${v}]`, () => {
      const [store, dispatch] = reducer;
      dispatch(v);
      expect(store.getState().toJS()).to.deep.equal({});
    });
  });
});
