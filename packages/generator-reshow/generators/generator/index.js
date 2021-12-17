const getYo = require("yo-reshow");
const { YoGenerator, YoHelper } = getYo();

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
    const { say, destFolderName, promptChainLocator, promptChain, getAllAns } = YoHelper(this);
    // https://github.com/yeoman/environment/blob/main/lib/util/log.js
    say(
      'Before "Start!"\n\n!! Need Create Folder First !!\n\nYou need create folder by yourself.'
    );

    const prompts = [
      {
        type: "confirm",
        name: "isReady",
        message: `We will put files at [${destFolderName}], do you already create generator folder?`,
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
      {
        type: "input",
        name: "mainName",
        message: "Please input your generator name?",
        default: destFolderName,
      },
      {
        type: "input",
        name: "description",
        message:
          "Please input description for plug-in? (will use in package.json)",
        default: "About ...",
      },
      {
        type: "input",
        name: "keyword",
        message: "Please input keyword for plug-in? (will use in package.json)",
        default: "",
      },
    ];

    const answers = await promptChain(promptChainLocator(prompts));
    
    say(answers);

    this.mainName = answers.mainName;
    this.description = answers.description;
    this.keyword = answers.keyword || answers.mainName;
  }

  writing() {
    const { cp } = YoHelper(this);
  }
};
