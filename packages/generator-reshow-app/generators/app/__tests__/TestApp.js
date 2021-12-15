/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 */

const getYo = require("yo-reshow");
const { YoTest, assert } = getYo();

describe("generator-reshow-app:app", () => {
  before((done) => {
    YoTest({
      folder: __dirname + "/../.",
      done,
      params: {
        isReady: true,
        appNamee: "foo",
        description: "foo-desc",
        keyword: "foo-keyword",
      },
    });
  });

  it("should have folder", () => {
    assert.file(["src", "ui"]);
  });

  it("should have file", () => {
    assert.file(["compile.sh", "index.html"]);
  });

  it("should have content", () => {
    //    assert.fileContent('composer.json', 'foo-desc');
    //    assert.fileContent('.circleci/config.yml', 'foo');
  });
});
