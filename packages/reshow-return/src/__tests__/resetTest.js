import { expect } from "chai";

import options from "../connectOptions";
const { reset } = options;

describe("Test reset", () => {
  it("basic test", () => {
    const a = {
      immutable: true,
      "data-foo": "bar",
    };
    reset(a);
    expect(a.immutable).to.be.undefined;
  });
});
