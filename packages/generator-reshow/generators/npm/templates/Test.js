const {expect} = require("chai");
const {init} = require("../init");

describe("Test <%= mainName %>", () => {
  it("basic testt", () => {
    /*your test code*/
    const actual = init();
    expect(actual).to.equal('foo');
  });
});
