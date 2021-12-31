const getYo = require("yo-reshow");
const { YoGenerator, YoHelper, commonPrompt } = getYo();

/**
 * App Generator
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
    const { handleAnswers } = YoHelper(this);
    const prompts = [
      ...commonPrompt.mainName(this),
      ...commonPrompt.desc(this),
    ];
    const answers = await this.prompt(prompts);
    handleAnswers(answers);
    this.composeWith(require.resolve("../compile-sh"), this.payload);
  }

  writing() {
    this.env.options.nodePackageManager = "yarn";
    const { cp, chMainName, mkdir } = YoHelper(this);

    // handle change to new folder
    chMainName(this.mainName);

    // handle copy file
    mkdir("ui/organisms");
    cp("ui");
    cp("src");
    cp("data");
    cp(".gitignore");
    cp("screen.sh");
    cp("index.html");
    cp("package.json");
    cp("README.md");
    cp("webpack.config.js");
  }

  async end() {
    if (!this.options?.skipInstall) {
      const { say } = YoHelper(this);
      await this.spawnCommand("./compile.sh", ["s", "open"]);
      say("Check the web browser, it should autoload now.");
    }
  }
};
