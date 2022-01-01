/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 *
 * https://github.com/yeoman/yeoman-assert/blob/main/index.js
 * https://github.com/yeoman/yeoman-test/blob/main/lib/run-context.js
 */

const getYoUnit = require("yo-unit");
const { YoTest, assert } = getYoUnit();

describe("!! generator !!", () => {
  let runResult;

  before(async () => {
    runResult = await YoTest({
      source: __dirname + "/../.",
      params: {
        isReady: true,
        mainNamee: "foo",
        description: "foo-desc",
        keyword: "foo-keyword",
      },
    });
  });

  after(() => {
    if (runResult) {
      runResult.restore();
    }
  });

  it("should have folder", () => {
    assert.file(["__tests__"]);
  });

  it("should have file", () => {
    assert.file(["README.md", "index.js"]);
  });

  it("should have content", () => {
    assert.fileContent("README.md", "foo");
  });
});
