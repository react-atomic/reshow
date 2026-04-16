import { describe, it } from "bun:test";
import { YoHelper } from "../index";

describe("mkdirp", () => {
  it("test mkdirp", () => {
    const mockGen = {
      destinationPath: (path: string) => path,
    };
    const { mkdir } = YoHelper(mockGen);
    return mkdir("/tmp/testfoo").then(() => {
      // do nothing
    });
  });
});
