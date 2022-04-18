import { expect } from "chai";
import sinon from "sinon";
import createReducer from "../createReducer";

describe("Test createReducer", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action, {});
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
      dispatch((prev) => prev + "yyy");
      expect(store.getState()).to.deep.equal("xxxyyy");
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

  it("Test reset", () => {
    const [store, dispatch] = createReducer((state, action) => action, "foo");
    const resetVal = store.reset();
    expect(resetVal).to.equal("foo");
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
