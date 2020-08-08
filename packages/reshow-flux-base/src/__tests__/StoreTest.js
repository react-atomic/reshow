"use strict";

import { Dispatcher, Store } from "../index";
import { expect } from "chai";
import sinon from "sinon";

describe("Test Store", () => {
  class FakeStore extends Store {
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

  it("dispatch with empty", (done) => {
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    dispatcher.dispatch();
    setTimeout(() => {
      const state = store.getState();
      expect(state).to.be.empty;
      done();
    }, 50);
  });

  it("Emit with custom event", (done) => {
    const dispatcher = new Dispatcher();
    const store = new FakeStore(dispatcher);
    const callback = sinon.spy();
    store.addListener(callback, "test");
    expect(callback.called).to.be.false;
    store.nextEmits.push("test");
    dispatcher.dispatch();
    setTimeout(() => {
      expect(callback.called).to.be.true;
      done();
    }, 50);
  });
});
