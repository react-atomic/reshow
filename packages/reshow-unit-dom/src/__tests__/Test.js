import { expect } from "chai";
import { cleanIt, jsdom } from "../index";

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
