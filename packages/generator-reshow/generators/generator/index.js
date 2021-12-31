const getYo = require("yo-reshow");
const { YoGenerator, YoHelper, commonPrompt } = getYo();

/**
 * The Generator
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
    this.env.options.nodePackageManager = "yarn";

    const {
      handleAnswers,
      mergePromptOrOption,
      promptChainLocator,
      promptChain,
    } = YoHelper(this);

    const prompts = [
      ...commonPrompt.mainName(this),
      ...commonPrompt.desc(this),
    ];

    const answers = await promptChain(promptChainLocator(prompts));
    handleAnswers(answers);
  }

  writing() {
    const { cp, chMainName } = YoHelper(this);

    // handle change to new folder
    chMainName(this.mainName);

    // handle copy file 
    cp('Test.js', '__tests__/Test.js', this.payload);
    cp('README.md', null, this.payload);
    cp('index.js',  null, this.payload);
    cp('templates');
  }
};
