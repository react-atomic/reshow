const getYo = require("../index");
const { YoTest, YoGenerator, YoHelper, assert } = getYo();

class FakeGenerator extends YoGenerator {
  async prompting() {
    const { say } = YoHelper(this);
    const prompts = [
      {
        type: "confirm",
        name: "fakeName",
        message: `This is fake quetion?`,
        default: false,
      },
    ];
    const answers = await this.prompt(prompts);
    this.fakeName = answers.fakeName;
  }

  writing() {
    const { cp } = YoHelper(this);
    cp(__dirname + "/templates/fakeSrc", null, { fakeName: this.fakeName });
  }
}

describe("CopyTplWithFolder Test", () => {
  before(async () => {
    await YoTest({
      source: FakeGenerator,
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
