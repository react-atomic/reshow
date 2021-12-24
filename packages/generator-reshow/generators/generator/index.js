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

    const {
      say,
      getDestFolderName,
      promptChainLocator,
      promptChain,
      getAllAns,
    } = YoHelper(this);
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
          message: `We will put files at [${getDestFolderName()}], do you confirm it?`,
          default: false,
        },
        {
          when: (response) => {
            if (!getAllAns().isReady) {
              say("Exit for not ready to create folder.");
              process.exit(0);
            }
          },
        },
      ];
    }
    const destFolderName = getDestFolderName();

    const prompts = [
      ...namePrompt,
      {
        type: "input",
        name: "mainName",
        message: "Please input your generator name?",
        default: mainName || getDestFolderName(),
      },
      {
        type: "input",
        name: "description",
        message:
          "Please input description for generator? (will use in package.json)",
        default: "About ...",
      },
      {
        type: "input",
        name: "keyword",
        message: "Please input keyword for generator? (will use in package.json)",
        default: "",
      },
    ];

    const answers = await promptChain(promptChainLocator(prompts));

    say(answers);

    this.mainName = answers.mainName;
    this.payload = {
      mainName: this.mainName,
      description: answers.description,
      keyword: answers.keyword || this.mainName,
    };
  }

  writing() {
    const { cp, chdir, mkdir, getDestFolderName } = YoHelper(this);
    if (this.mainName !== getDestFolderName()) {
      chdir(this.mainName);
    }
    // const ucMainName = 
    cp('Test.js', '__tests__/Test.js', this.payload);
    cp('README.md', null, this.payload);
    cp('index.js',  null, this.payload);
  }
};
