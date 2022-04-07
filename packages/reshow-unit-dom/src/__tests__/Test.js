import { expect } from "chai";
import { cleanIt, jsdom, hideConsoleError, getSinon as sinon } from "../index";

describe("Test reshow-unit-dom", () => {
  beforeEach(() => {
    jsdom();
  });
  afterEach(() => {
    cleanIt();
  });

  it("basic testt", () => {
    /*your test code*/
    cleanIt();
    expect(document.body.innerHTML).to.equal("");
  });
});

describe("Test hideConsoleError", () => {
  it("test throw", () => {
    hideConsoleError(true);
    expect(() => console.error("foo")).to.throw("foo");
  });

  it("test spy", () => {
    const spy = sinon().spy(() => {});
    hideConsoleError(spy);
    console.error("foo");
    expect(spy.called).to.be.true;
  });
});
