const getYo = require("../index");
const { YoTest, assert } = getYo();

describe("CopyTplWithFolder Test", () => {
  before((done) => {
    YoTest({
      folder: __dirname + "/fakeGenerator",
      done,
      params: {
        fakeName: "bar",
      },
    });
  });
  it("should have content", () => {
        assert.fileContent('fakeSrc/fake1.js', 'foo1 = "bar"');
        assert.fileContent('fakeSrc/fake2.js', 'foo2 = "bar"');
  });
});
