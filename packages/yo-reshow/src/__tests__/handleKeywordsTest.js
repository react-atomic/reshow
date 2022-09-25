const { expect } = require("chai");
const handleKeywords = require("../handleKeywords");

describe("Test handleKeywords", () => {
  it("basic test", () => {
    let result;
    handleKeywords("a, b, c", (arr) => (result = arr));
    expect(result).to.deep.equal(["a", "b", "c"]);
  });
});
