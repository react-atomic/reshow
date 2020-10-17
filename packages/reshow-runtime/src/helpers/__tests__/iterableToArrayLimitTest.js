import iterableToArrayLimit from "../iterableToArrayLimit";
import { expect } from "chai";

describe("Test iterableToArrayLimit", () => {
  it("basic test", () => {
    const obj = {
      a: 1,
      b: "str",
      c: true,
    };
    const arr = iterableToArrayLimit(obj, 2);
    expect(arr[0]).to.equal(obj.a);
    expect(arr[1]).to.equal(obj.b);
    expect(arr.length).to.equal(2);
  });
});
