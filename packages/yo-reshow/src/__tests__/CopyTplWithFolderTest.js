import getYo from "../index";
const { YoTest, assert } = getYo();

describe("CopyTplWithFolder Test", () => {
  before(async () => {
    await YoTest({
      folder: __dirname + "/fakeGenerator",
      params: {
        fakeName: "bar",
      },
    });
  });
  it("should have content", () => {
    assert.fileContent("fakeSrc/fake1.js", 'foo1 = "bar"');
    assert.fileContent("fakeSrc/fake2.js", 'foo2 = "bar"');
  });
});
