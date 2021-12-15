const getYo = require("../../index");
const {YoGenerator, YoHelper} = getYo();

module.exports = class extends YoGenerator {

  async prompting() {
    const {say, destFolderName} = YoHelper(this);
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
    const {cp} = YoHelper(this);
    cp("fakeSrc", null, {fakeName: this.fakeName});
  }
};

