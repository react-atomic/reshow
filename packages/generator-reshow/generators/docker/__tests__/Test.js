/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 *
 * https://github.com/yeoman/yeoman-assert/blob/main/index.js
 * https://github.com/yeoman/yeoman-test/blob/main/lib/run-context.js
 */

const { YoTest, assert } = require("yo-unit");

describe("!! docker !!", () => {
  let runResult;

  before(async () => {
    runResult = await YoTest({
      source: __dirname + "/../.",
      params: {
        isReady: true,
        description: "foo-desc",
      },
    });
  });

  after(() => {
    if (runResult) {
      runResult.restore();
    }
  });

  it("should have folder", () => {
     assert.file(["bin", ".circleci"]);
  });

  it("should have file", () => {
    //   assert.file(["compile.sh", "index.html"]);
  });

  it("should have content", () => {
    //    assert.fileContent('composer.json', 'foo-desc');
    //    assert.fileContent('.circleci/config.yml', 'foo');
  });
});
