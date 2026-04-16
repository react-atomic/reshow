import { expect, describe, it, beforeAll, afterAll } from "bun:test";
import { YoTest } from "yo-unit";
import { YoGenerator, YoHelper } from "../index";

class FakeGenerator extends YoGenerator {
  writing() {
    const { glob } = YoHelper(this);
    (this as any).testGlob = [];
    glob(__dirname + "/templates", ({ dirname, basename }: { dirname: string; basename: string }) => {
      (this as any).testGlob.push({ dirname, basename });
    });
  }
}

describe("Glob test", () => {
  let runResult: any;
  beforeAll(async () => {
    runResult = await YoTest({ source: FakeGenerator });
  });

  afterAll(() => {
    if (runResult) runResult.restore();
  });

  it("test glob", () => {
    const { generator } = runResult;
    expect(generator.testGlob).toEqual([
      { dirname: "fakeSrc", basename: "fake1.js" },
      { dirname: "fakeSrc", basename: "fake2.js" },
    ]);
  });
});
