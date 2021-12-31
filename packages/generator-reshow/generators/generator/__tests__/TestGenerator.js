/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 */

const getYo = require("yo-reshow");
const { YoTest, assert } = getYo();

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
