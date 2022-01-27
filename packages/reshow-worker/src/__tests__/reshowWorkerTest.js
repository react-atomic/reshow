import { expect } from "chai";
import sinon from "sinon";

import initWorker from "../index";

describe("Test reshowWorker", () => {
  

  it("test init", () => {
    const win = { Worker: false };
    initWorker(win);
  });

  it("test import is call", () => {
    const win = { Worker: true };
    const spy = sinon.spy();
    initWorker(win, spy);
    expect(spy.called).to.be.true;
  });
});
