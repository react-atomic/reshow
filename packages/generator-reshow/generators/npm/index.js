const getYo = require("yo-reshow");
const { YoGenerator, YoHelper, commonPrompt } = getYo();

/**
 * NPM Generator
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
      ...commonPrompt.babel(this),
      ...commonPrompt.desc(this),
      ...commonPrompt.author(this),
      ...commonPrompt.repository(this),
    ];

    const answers = await mergePromptOrOption(prompts, (nextPrompts) =>
      promptChain(promptChainLocator(nextPrompts))
    );
    handleAnswers(answers);
    this.composeWith(require.resolve("../compile-sh"), this.payload);
  }

  writing() {
    const { cp, chMainName, updateJSON } = YoHelper(this);

    // handle change to new folder
    chMainName(this.mainName);

    // handle copy file
    cp("src", null, this.payload);
    cp("README.md", null, this.payload);
    cp("Test.js", "src/__tests__/Test.js", this.payload);

    updateJSON("package.json", null, this.payload, (data) => {
      data.repository = this.payload.repository;
      data.homepage = this.payload.repositoryHomepage;
      data.dependencies = {
        ...data.dependencies,
        ...this.payload.npmDependencies,
      };
      return data;
    });
  }
};