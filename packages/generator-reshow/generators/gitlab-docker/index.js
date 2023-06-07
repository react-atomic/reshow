const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");
const commonDockerPrompt = require("../docker/commonDockerPrompt");

/**
 * gitlab-docker Generator
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
    const { handleAnswers, promptChainAll } = YoHelper(this);

    const prompts = [
      ...commonPrompt.mainName(this),
      ...commonPrompt.desc(this),
      ...commonDockerPrompt(this),
      {
        type: "input",
        name: "tags",
        message: "Please input your gitlab tags and separate by comma",
      },
    ];

    const answers = await promptChainAll(prompts);
    handleAnswers(answers);
    this.composeWith(require.resolve("../docker"), {
      repositoryName: "",
      repositoryOrgName: "",
      description: "",
      ...answers,
      fromGitlab: true,
    });
  }

  writing() {
    this.env.options.nodePackageManager = "yarn";
    this.options.skipInstall = true;
    const { cp, chMainName } = YoHelper(this);

    // handle change to new folder
    chMainName(this.mainName);

    if (this.payload.tags) {
      let tags = this.payload.tags;
      if (tags.split) {
        tags = this.payload.tags.split(",");
        this.payload.tags = tags;
      }
      this.payload.tagJson = JSON.stringify(tags.map((item) => item.trim()));
    } else {
      this.payload.tagJson = "";
    }

    // handle copy file
    cp("Dockerfile", null, this.payload);
    cp("README.md", null, this.payload);
    cp(".gitlab-ci.yml", null, this.payload);
    cp(".gitlab/.gitlab-trigger.yml", null, this.payload);
  }
};
