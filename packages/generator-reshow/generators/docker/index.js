const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");

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
    const { say, handleAnswers, promptChainAll } = YoHelper(this);

    const prompts = [
      ...commonPrompt.mainName(this),
      ...commonPrompt.desc(this, { keyword: false }),
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
        name: "verPrefix",
        message: "Please input your version-prefix, will use with folder name and version?",
        default: "ver-",
      },
      {
        type: "input",
        name: "terratest",
        message: "Please input terratest docker image name?",
        default: "terratest",
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

    const answers = await promptChainAll(prompts);
    handleAnswers(answers, (payload) => {
      // add more payload
      payload.verPrefixGitIgnore = payload.verPrefix ? payload.verPrefix + "*" : "";
      let imgName = payload.mainName;
      if (payload.dockerImageName) {
        imgName = payload.dockerImageName;
        if (payload.dockerOrgName) {
          imgName = `${payload.dockerOrgName}/${payload.dockerImageName}`;
        }
      }
      payload.localImage = imgName;
      payload.remoteImage = imgName;
    });
  }

  writing() {
    const { cp, chMainName } = YoHelper(this);

    // handle change to new folder
    chMainName();

    // handle copy file
    if (!this.options.fromGitlab) {
      cp("Dockerfile", null, this.payload);
      cp("README.md", null, this.payload);
    }
    cp("_circleci", ".circleci", this.payload);
    cp(".env.build", null, this.payload);
    cp("_gitignore", ".gitignore", this.payload);
    cp("build.sh", null, this.payload);
    cp("compile.sh", null, this.payload);
    cp("install-packages.sh", null, this.payload);
    cp("support", null, this.payload);
    cp("bin", null, this.payload);
    cp("docker", null, this.payload);
  }
};
