import { expect } from "chai";

describe("Test Process", () => {
  it("basic test", () => {
    expect(process.env.STRICT_MODE).to.equal("on");
  });
});
