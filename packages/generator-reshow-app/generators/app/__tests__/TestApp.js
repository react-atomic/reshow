/**
 * https://yeoman.io/authoring/testing.html
 * https://gilsondev.gitbooks.io/yeoman-authoring/content/authoring/unit_testing.html
 */
const path = require("path");
const helpers = require("yeoman-test");
const assert = require("yeoman-assert");

describe("php-pmvc-plugin:app", () => {
  before((done) => {
    helpers
      .run(path.join(__dirname, "../."))
      .inTmpDir(dir=>{console.log('Test folder: '+ dir)})
      .withPrompts({
        isReady: true,
        appNamee: "foo",
        description: "foo-desc",
        keyword: "foo-keyword",
      })
      .on("end", () => {
        done();
      });
  });

  it("should have folder", () => {
    assert.file(['src', 'ui']);
  });

  it("should have file", () => {
    assert.file(['compile.sh', 'index.html']);
  });

  it("should have content", () => {
//    assert.fileContent('composer.json', 'foo-desc');
//    assert.fileContent('.circleci/config.yml', 'foo');
  });
});
