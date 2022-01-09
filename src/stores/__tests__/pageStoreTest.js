import { expect } from "chai";
import sinon from "sinon";

import pageStore, { pageDispatch } from "../pageStore";

describe("Test pageStore", () => {
  afterEach(() => {
    pageStore.reset();
    pageDispatch();
  });
  it("test merge empty", (done) => {
    const callback = sinon.spy(() => {
      expect(callback.callCount).to.equal(1);
      done();
    });
    pageStore.addListener(callback);
    pageDispatch();
    pageDispatch({});
    pageDispatch({ foo: "bar" });
  });
});
