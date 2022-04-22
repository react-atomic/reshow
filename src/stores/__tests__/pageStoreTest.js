import { expect } from "chai";
import { getSinon, cleanIt } from "reshow-unit";

import pageStore, { pageDispatch } from "../pageStore";

describe("Test pageStore", () => {
  afterEach(() => {
    pageStore.reset();
    cleanIt();
  });

  it("test merge empty", (done) => {
    const callback = getSinon().spy(() => {
      expect(callback.callCount).to.equal(1);
      done();
    });
    pageStore.addListener(callback);
    pageDispatch();
    pageDispatch({});
    pageDispatch({ foo: "bar" });
  });
});
