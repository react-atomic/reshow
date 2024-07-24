// @ts-check
/**
 * @typedef {import("mocha")}
 */

/**
 * @typedef {import("../type").ActionObject} ActionObject
 */

import { expect } from "chai";
import * as sinon from "sinon";
import { createReducer, getMitt } from "../createReducer";

describe("Test createReducer", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => state && action, {});
  });

  describe("Test dispatch", () => {
    it("basic dispatch", () => {
      const [store, dispatch] = reducer;
      const action = { aaa: "bbb" };
      dispatch(action);
      expect(store.getState()).to.deep.equal(action);
    });
    it("dispatch empty", () => {
      const [store, dispatch] = reducer;
      dispatch();
      expect(store.getState()).to.be.empty;
    });
    it("could support text dispatch", () => {
      const [store, dispatch] = reducer;
      dispatch("xxx");
      expect(store.getState()).to.deep.equal({ type: "xxx" });
    });
    it("it could dispatch with function", () => {
      const [store, dispatch] = reducer;
      dispatch(() => "xxx");
      expect(store.getState()).to.deep.equal("xxx");
      dispatch((/** @type any*/ prev) => prev + "yyy");
      expect(store.getState()).to.deep.equal("xxxyyy");
    });
    it("it could dispatch boolean", () => {
      const [store, dispatch] = createReducer(
        (_state, action) => ({ foo: action }),
        { foo: true }
      );
      expect(store.getState()).to.deep.equal({ foo: true });
      dispatch(false);
      expect(store.getState()).to.deep.equal({ foo: false });
      dispatch(true);
      expect(store.getState()).to.deep.equal({ foo: true });
    });
  });

  describe("Test dispatch more type", () => {
    it("dispatch with number also could include string", () => {
      const [store, dispatch] = createReducer(
        (_state, /**@type number*/ action) => ({ foo: action }),
        { foo: 1 }
      );
      expect(store.getState()).to.deep.equal({ foo: 1 });
      dispatch("");
      expect(store.getState()).to.deep.equal({ foo: { type: "" } });
    });
    it("dispatch with string", () => {
      const [store, dispatch] = createReducer(
        (_state, /**@type ActionObject*/ action) => {
          return { foo: action.type };
        },
        { foo: "bar" }
      );
      expect(store.getState()).to.deep.equal({ foo: "bar" });
      dispatch("");
      expect(store.getState()).to.deep.equal({ foo: "" });
    });
  });

  describe("Test emit reduce", () => {
    it("test merge string", () => {
      const uMitt = getMitt();
      uMitt.add((state) => state + 1);
      uMitt.add((state) => state + 2);
      const actual = uMitt.emit("foo");
      expect(actual).to.equal("foo12");
    });
  });

  it("Emit with custom event", (done) => {
    const [store, dispatch] = reducer;
    const callback = sinon.spy();
    store.addListener(callback);
    dispatch();
    setTimeout(() => {
      expect(callback.called).to.be.true;
      done();
    });
  });

  it("Test lazy initState with number", () => {
    const [store, dispatch] = createReducer(
      (state, action) => state && action && 111,
      () => 111
    );
    dispatch(null);
    expect(store.getState()).to.equal(111);
  });

  it("Test lazy initState with object", () => {
    const [store, dispatch] = createReducer(
      (state, action) => state && action,
      () => ({ foo: "bar" })
    );
    dispatch(null);
    expect(store.getState()).to.deep.equal({});
  });

  it("Test reset", () => {
    const [store, dispatch] = createReducer(() => "bar", "foo");
    dispatch(null);
    expect(store.getState()).to.equal("bar");
    store.reset();
    expect(store.getState()).to.equal("foo");
  });

  it("Test reset event", (done) => {
    const [store, dispatch] = reducer;
    const callback = sinon.spy();
    store.addListener(callback);
    dispatch();
    setTimeout(() => {
      expect(callback.callCount).to.equal(1);
      store.reset();
      dispatch();
      setTimeout(() => {
        expect(callback.callCount).to.equal(1);
        done();
      });
    });
  });
});
