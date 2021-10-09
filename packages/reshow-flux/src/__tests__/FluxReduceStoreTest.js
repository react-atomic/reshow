import { Dispatcher, ReduceStore } from "../index";
import { expect } from "chai";

describe("Test Store", () => {
  class FakeStore extends ReduceStore {
    getInitialState() {
      return [];
    }

    reduce(state, action) {
      return action;
    }
  }

  it("could register with dispatcher", (done) => {
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    const action = { aaa: "bbb" };
    dispatcher.dispatch(action);
    setTimeout(() => {
      const state = store.getState();
      expect(state).to.equal(action);
      done();
    }, 50);
  });

  it("dispatch with empty", () => {
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    dispatcher.dispatch();
    const state = store.getState();
    expect(state).to.be.empty;
  });
});
