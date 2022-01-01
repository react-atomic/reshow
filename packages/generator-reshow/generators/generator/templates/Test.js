/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 *
 * https://github.com/yeoman/yeoman-assert/blob/main/index.js
 * https://github.com/yeoman/yeoman-test/blob/main/lib/run-context.js
 */

const getYoUnit = require("yo-unit");
const { YoTest, assert } = getYoUnit();

describe("!! <%= mainName %> !!", () => {
  let runResult;

  before(async () => {
    runResult = await YoTest({
      source: __dirname + "/../.",
      params: {
        isReady: true,
        appNamee: "foo",
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
    //    assert.file(["src", "ui"]);
  });

  it("should have file", () => {
    //   assert.file(["compile.sh", "index.html"]);
  });

  it("should have content", () => {
    //    assert.fileContent('composer.json', 'foo-desc');
    //    assert.fileContent('.circleci/config.yml', 'foo');
  });
});
