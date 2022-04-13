import { expect } from "chai";

describe("Test Process", () => {
  it("basic test", ()=>{
    console.log(process.env.STRICT_MODE);
    expect(process.env.STRICT_MODE).to.equal("on");
  });
});
