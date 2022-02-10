const getYo = require("yo-reshow");
const { YoGenerator, YoHelper, commonPrompt } = getYo();

/**
 * docker Generator
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
      mergePromptOrOption,
      promptChainLocator,
      promptChain,
    } = YoHelper(this);

    const prompts = [
      ...commonPrompt.mainName(this),
      ...commonPrompt.desc(this),
      ...commonPrompt.repository(this, {
        defaultRepositoryName: "[REPOSITORY_NAME]",
        defaultRepositoryOrgName: "[REPOSITORY_ORG_NAME]",
      }),
      {
        type: "input",
        name: "dockerImageName",
        message: "Please input your docker-image-name?",
        default: "[DOCKER_IMAGE_NAME]",
      },
      {
        type: "input",
        name: "dockerOrgName",
        message: "Please input your docker-org-name?",
        default: "[DOCKER_ORG_NAME]",
      },
      {
        type: "input",
        name: "folderPrefix",
        message: "Please input your folder-prefix?",
        default: "",
      },
      /*
      {
        type: "input",
        name: "xxx",
        message: "Please input xxx?",
        default: "",
      },
      */
    ];

    const answers = await mergePromptOrOption(prompts, (nextPrompts) =>
      promptChain(promptChainLocator(nextPrompts))
    );
    handleAnswers(answers);
  }

  writing() {
    this.payload.folderPrefixGitIgnore = this.payload.folderPrefix
      ? this.payload.folderPrefix + "*"
      : "";

    this.env.options.nodePackageManager = "yarn";
    const { cp, chMainName } = YoHelper(this);

    // handle change to new folder
    chMainName();

    // handle copy file
    cp(".env.build", null, this.payload);
    cp("Dockerfile", null, this.payload);
    cp("README.md", null, this.payload);
    cp("_circleci", ".circleci", this.payload);
    cp("_gitignore", ".gitignore", this.payload);
    cp("build.sh", null, this.payload);
    cp("compile.sh", null, this.payload);
    cp("install-packages.sh", null, this.payload);
    cp("support", null, this.payload);
  }
};