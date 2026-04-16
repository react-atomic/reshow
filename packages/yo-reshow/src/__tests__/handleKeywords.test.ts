import { expect, describe, it } from "bun:test";
import handleKeywords from "../handleKeywords";

describe("Test handleKeywords", () => {
  it("basic test", () => {
    let result: string[] | undefined;
    handleKeywords("a, b, c", (arr) => (result = arr));
    expect(result).toEqual(["a", "b", "c"]);
  });
});
