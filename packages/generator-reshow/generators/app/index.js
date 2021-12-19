const getYo = require("yo-reshow");
const { YoGenerator, YoHelper } = getYo();

module.exports = class extends YoGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("mainName", { type: String, required: false });
  }

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

    const { say, getDestFolderName } = YoHelper(this);
    const { mainName } = this.options;
    let namePrompt = [];
    if (!mainName) {
      say(
        'Before "Start!"\n\n!! Need Create Folder First !!\n\nYou need create folder\n by yourself.'
      );
      namePrompt = [
        {
          type: "confirm",
          name: "isReady",
          message: `We will put files at [${getDestFolderName()}], do you already create app folder?`,
          default: false,
        },
        {
          when: (response) => {
            if (!response.isReady) {
              process.exit(0);
            }
          },
        },
      ];
    }

    const prompts = [
      ...namePrompt,
      {
        type: "input",
        name: "mainName",
        message: "Please input your app name?",
        default: mainName || getDestFolderName(),
      },
      {
        type: "input",
        name: "description",
        message:
          "Please input description for app? (will use in package.json)",
        default: "About ...",
      },
      {
        type: "input",
        name: "keyword",
        message: "Please input keyword for app? (will use in package.json)",
        default: "",
      },
    ];
    const answers = await this.prompt(prompts);
    this.mainName = answers.mainName;
    this.description = answers.description;
    this.keyword = answers.keyword || answers.mainName;
  }

  writing() {
    const { cp, chdir } = YoHelper(this);
    chdir(this.mainName);
    cp("ui");
    cp("src");
    cp("data");
    cp(".gitignore");
    cp("compile.sh");
    cp("index.html");
    cp("package.json");
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
