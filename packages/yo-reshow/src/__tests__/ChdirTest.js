import { expect } from "chai";
import getYo from "../index";
const { YoTest, YoGenerator, YoHelper, assert, getBuildDir } = getYo();

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
    const { cp, chdir } = YoHelper(this);
    console.log(this.options.chdir);
    chdir(this.options.chdir);
  }
}

describe("Chdir test", () => {
  let runResult;
  before(async () => {
   runResult = await YoTest({
      source: FakeGenerator,
      options: {chdir: 'abc'},
      params: {
        fakeName: "bar",
      },
    });
  });

  after(()=>{
    if (runResult) {
      runResult.restore();
    }
  });

  it("test path", () => {
    const expected = getBuildDir() + '/abc';
    expect(runResult.generator.destinationPath()).to.equal(expected);
  });
});

