import { expect } from "chai";
import sinon from "sinon";
import createReducer from "../createReducer";

describe("Test createReducer", () => {
  let reduce;
  beforeEach(() => {
    reduce = createReducer((state, action) => action, []);
  });

  it("basic test", () => {
    const [store, dispatch] = reduce;
    const action = { aaa: "bbb" };
    dispatch(action);
    expect(store.getState()).to.deep.equal(action);
  });

  it("dispatch empty", () => {
    const [store, dispatch] = reduce;
    dispatch();
    expect(store.getState()).to.be.empty;
  });

  it("Emit with custom event", (done) => {
    const [store, dispatch] = reduce;
    const callback = sinon.spy();
    store.addListener(callback);
    dispatch();
    setTimeout(() => {
      expect(callback.called).to.be.true;
      done();
    });
  });

  it("could support text dispatch", () => {
    const [store, dispatch] = reduce;
    dispatch("xxx");
    expect(store.getState()).to.deep.equal({ type: "xxx" });
  });
});
