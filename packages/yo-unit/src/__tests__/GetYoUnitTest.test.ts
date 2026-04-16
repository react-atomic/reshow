import { expect, test, describe } from "bun:test";
import { YoTest, assert } from "../index";

describe("Test yo-unit", () => {
  test("basic test", () => {
    expect(YoTest).not.toBeNull();
    expect(assert).not.toBeNull();
  });
});
