import { expect } from "chai";

import ImmutableStore, { Map, mergeMap, getMap } from "../ImmutableStore";

describe("Test ImmutableStore", () => {
  const reducee = (state, action) => mergeMap(state, action);

  it("test merge map", () => {
    const [store, dispatch] = ImmutableStore(reducee);
    const action = { aaa: { bbb: "ccc" } };
    dispatch(action);
    const state = store.getState();
    expect(Map.isMap(state.get("aaa"))).to.be.true;
    expect(state.get("aaa").toJS()).to.deep.equal({ bbb: "ccc" });
  });

  it("test get map", () => {
    const [store, dispatch] = ImmutableStore(reducee);
    const action = { aaa: { bbb: "ccc" } };
    dispatch(action);
    const state = store.getState();
    expect(getMap(state, "aaa")).to.deep.equal({ bbb: "ccc" });
  });
});
