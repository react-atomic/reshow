import { expect } from "chai";

import init from "../init";

describe("Test <%= mainName %>", () => {
  it("basic testt", () => {
    /*your test code*/
    const actual = init();
    expect(actual).to.equal('foo');
  });
});
