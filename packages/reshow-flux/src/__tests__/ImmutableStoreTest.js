//@ts-check
/**
 * @typedef {import("mocha")}
 */

import { expect } from "chai";

import ImmutableStore, { Map, mergeMap } from "../ImmutableStore";

describe("Test ImmutableStore", () => {
  let reducer;
  beforeEach(() => {
    reducer = ImmutableStore((state, action) => mergeMap(state, action));
  });

  it("test merge map with js array", () => {
    const [store, dispatch] = reducer;
    const action = { aaa: { bbb: "ccc" } };
    dispatch(action);
    const state = store.getState();
    const aaa = state.get("aaa");
    expect(Map.isMap(aaa)).to.be.false;
    expect(aaa).to.deep.equal({ bbb: "ccc" });
    expect(aaa === action.aaa).to.be.true;
  });

  it("test merge map with map", () => {
    const [store, dispatch] = reducer;
    const action = Map({ aaa: Map({ bbb: "ccc" }) });
    dispatch(action);
    const state = store.getState();
    const aaa = state.get("aaa");
    expect(Map.isMap(aaa)).to.be.true;
    expect(aaa.toJS()).to.deep.equal({ bbb: "ccc" });
    expect(aaa === action.get("aaa")).to.be.true;
  });

  it("test getIn", () => {
    const result = mergeMap(Map(), { a: { b: { c: "d" } } });
    const b = result.getIn(["a", "b"]);
    expect(Map.isMap(b)).to.be.false;
    expect(b).to.deep.equal({ c: "d" });
  });

  it("test get map", () => {
    const [store, dispatch] = reducer;
    const action = { aaa: { bbb: "ccc" } };
    dispatch(action);
    expect(store.getMap("aaa")).to.deep.equal({ bbb: "ccc" });
  });

  [true, false, 0, null, undefined].forEach((v) => {
    it(`test set empty [${v}]`, () => {
      const [store, dispatch] = reducer;
      dispatch(v);
      expect(store.getState().toJS()).to.deep.equal({});
    });
  });

  it(`test with empty string`, () => {
    const [store, dispatch] = reducer;
    dispatch("");
    expect(store.getState().toJS()).to.deep.equal({ type: "" });
  });
});
