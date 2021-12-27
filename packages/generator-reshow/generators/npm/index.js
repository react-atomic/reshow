const getYo = require("yo-reshow");
const { YoGenerator, YoHelper, namePrompt } = getYo();

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
      say,
      getDestFolderName,
      mergePromptOrOption,
      promptChainLocator,
      promptChain,
      getAllAns,
    } = YoHelper(this);

    const prompts = [
      ...namePrompt(this),
      {
        type: "input",
        name: "description",
        message:
          "Please input description for npm?",
        default: "",
      },
      {
        type: "input",
        name: "keyword",
        message: "Please input keyword for npm?",
        default: "",
      },
      {
        type: "input",
        name: "authorName",
        message: "Please input author Name?",
        default: "",
      },
      {
        type: "input",
        name: "authorEmail",
        message: "Please input author Email?",
        default: "",
      },
      {
        type: "input",
        name: "repositoryName",
        message: "Please input GIT repository name ?",
        default: "",
      },
      {
        type: "input",
        name: "orgName",
        message: "Please input GIT organization name ?",
        default: "",
      },
    ];
    const answers =  await mergePromptOrOption(
      prompts,
      (nextPrompts) => promptChain(promptChainLocator(nextPrompts))
    );

    this.mainName = answers.mainName;
    this.payload = {
      mainName: this.mainName,
      description: answers.description || 'TODO: description',
      keyword: answers.keyword || this.mainName,
    };
  }

  writing() {
    const { cp, chdir, getDestFolderName } = YoHelper(this);
    if (this.mainName !== getDestFolderName()) {
      chdir(this.mainName);
    }
  }
};
