import { expect, describe, it } from "bun:test";
import { YoGenerator, YoHelper, commonPrompt } from "../index";

describe("Test GetYo", () => {
  it("basic test", () => {
    expect(YoGenerator).not.toBeNull();
    expect(YoHelper).not.toBeNull();
    expect(commonPrompt).not.toBeNull();
  });
});
