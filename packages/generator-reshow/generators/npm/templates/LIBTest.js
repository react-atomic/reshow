import { expect } from "chai";
import { getSinon } from "reshow-unit-dom";

import lib from "../lib";

describe("Lib Test", () => {
  it("basic test", () => {
    const spy = getSinon().spy(lib);
    const actual = spy("foo");
    expect(actual).to.equal("foo");
    expect(spy.called).to.be.true;
  });
});
