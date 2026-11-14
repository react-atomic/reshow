import { describe, it, beforeEach, afterEach } from "bun:test";

import { expect } from "chai";

describe("Test Process", () => {
  it("basic test", () => {
    expect(process.env.STRICT_MODE).to.equal("on");
  });
});
