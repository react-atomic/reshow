"use strict";

import { Dispatcher } from "../index";
import { expect } from "chai";

describe("Test Dispatcher", () => {
  const dispatcher = new Dispatcher();
  let result;
  dispatcher.register((action) => {
    result = action;
  });

  it("could support hash dispatch", (done) => {
    dispatcher.dispatch({ foo: "bar" });
    setTimeout(() => {
      expect(result).to.deep.equal({ foo: "bar" });
      done();
    }, 50);
  });

  it("could support text dispatch", (done) => {
    dispatcher.dispatch("xxx");
    setTimeout(() => {
      expect(result).to.deep.equal({ type: "xxx" });
      done();
    }, 50);
  });
});
