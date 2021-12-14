const Generator = require("yeoman-generator");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    // this.argument("appname", { type: String, required: true });

    // And you can then access it later; e.g.
    // this.log(this.options.appname);
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
   * Using lists in a yeoman prompt
   *
   * https://www.alwaystwisted.com/post.php?s=using-lists-in-a-yeoman-generator
   * https://github.com/SBoudrias/Inquirer.js
   */
  async prompting() {
    // https://github.com/yeoman/environment/blob/main/lib/util/log.js
    this.log(
      yosay(
        'Before "Start!"\n\n!! Need Create Folder First !!\n\nYou need create folder by yourself.',
        { maxLength: 30 }
      )
    );

    const folders = this.destinationRoot().split("/");
    const folderName = folders[folders.length - 1];
    const prompts = [
      {
        type: "confirm",
        name: "isReady",
        message: `We will put files at [${folderName}], do you already create plug-in folder?`,
        default: false,
      },
      {
        when: (response) => {
          if (!response.isReady) {
            process.exit(0);
          }
        },
      },
      {
        type: "input",
        name: "appName",
        message: "Please input your app name?",
        default: folderName,
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
    const answers = await this.prompt(prompts);
    this.props = answers;
    this.appName = answers.appName;
    this.description = answers.description;
    this.keyword = answers.keyword || answers.appName;
  }

  writing() {
    const copy = (src, dest, options) => {
      const action = options ? this.fs.copyTpl : this.fs.copy;
      dest = dest || src;
      try {
        action.call(
          this.fs,
          this.templatePath(src),
          this.destinationPath(dest),
          options
        );
      } catch (e) {
        console.log(e);
      }
    };

    mkdirp(this.destinationPath("src"));
    mkdirp(this.destinationPath("ui"));

    copy(".gitignore");
    copy("compile.sh");
    copy("index.html");
  }
};
