const getYo = require("yo-reshow");
const { YoGenerator, YoHelper, commonPrompt } = getYo();

/**
 * Library Generator
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
      handleAnswers,
      mergePromptOrOption,
      promptChainLocator,
      promptChain,
    } = YoHelper(this);

    const prompts = [
      ...commonPrompt.mainName(this),
      ...commonPrompt.desc(this),
      ...commonPrompt.author(this),
    ];

    const answers = await mergePromptOrOption(prompts, (nextPrompts) =>
      promptChain(promptChainLocator(nextPrompts))
    );
    handleAnswers(answers);
  }

  writing() {
    this.env.options.nodePackageManager = "yarn";
    const { cp, chMainName } = YoHelper(this);

    // handle change to new folder
    chMainName(this.mainName);

    // handle copy file
    cp("README.md", null, this.payload);
    cp("compile.sh", null, this.payload);
    cp("package.json", null, this.payload);
    cp("src", null, this.payload);
    cp("Test.js", "src/__tests__/Test.js", this.payload);
    cp("yarn.lock");
  }

  end() {
    if (!this.options?.skipInstall) {
      const { say, onExit } = YoHelper(this);
      onExit(() => say('Next you could try "npm run build" or "npm run test"'));
    }
  }
};
