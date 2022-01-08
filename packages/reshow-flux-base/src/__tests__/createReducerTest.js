import { expect } from "chai";
import sinon from "sinon";
import createReducer from "../createReducer";

describe("Test createReducer", () => {
  let reducer;
  beforeEach(() => {
    reducer = createReducer((state, action) => action, {});
  });

  it("basic test", () => {
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

  it("could support text dispatch", () => {
    const [store, dispatch] = reducer;
    dispatch("xxx");
    expect(store.getState()).to.deep.equal({ type: "xxx" });
  });
});
