const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");

/**
 * <%= mainName %> Generator
 */
module.exports = class extends YoGenerator {
  /**
   * Run loop (Life cycle)
   * https://yeoman.io/authoring/running-context.html#the-run-loop
   *
   * 1. initializing
   * 2. prompting
   * 3. configuring
   * 4. default
   * 5. writing
   * 6. conflicts
   * 7. install
   * 8. end
   */

  /**
   * Questions.
   *
   * https://www.alwaystwisted.com/post.php?s=using-lists-in-a-yeoman-generator
   * https://github.com/SBoudrias/Inquirer.js
   */
  async prompting() {
    const {
      say,
      handleAnswers,
      promptChainAll,
    } = YoHelper(this);

    const prompts = [
      ...commonPrompt.mainName(this),
      ...commonPrompt.desc(this),
      /*
      {
        type: "input",
        name: "xxx",
        message: "Please input xxx?",
        default: "",
      },
      */
    ];

    const answers = await promptChainAll(prompts);
    handleAnswers(answers);
  }

  writing() {
    this.env.options.nodePackageManager = "yarn";
    this.options.skipInstall = true;
    const { cp,  chMainName } = YoHelper(this);

    // handle change to new folder
    chMainName(this.mainName);

    // handle copy file
  }
};
