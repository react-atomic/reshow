const callfunc = require("call-func");
const YoHelper = require("./YoHelper");

const defaultI18n = {
  tip: ({ namespace }) =>
    `Generate "${namespace}"\n\n !! \n\nYou need create folder\n by yourself.`,
  isReady: ({ destFolderName }) =>
    `We will put files to [${destFolderName}], do you confirm it?`,
  notReady: "Exit for not ready to create folder.",
  mainName: "Please confirm your naming? Or rename it.",
};

const mainNamePrompt = (oGen, i18n) => {
  const { say, getDestFolderName, getAllAns, exit } = YoHelper(oGen);
  i18n = {...defaultI18n, ...i18n};

  /**
   * How to use argument?
   * @see https://yeoman.io/authoring/user-interactions.html#arguments 
   */
  oGen.argument("argMainName", { type: String, required: false });
  const { argMainName, namespace } = oGen.options;
  oGen.options.subGeneratorName = namespace.split(":")[1];

  const prompts = [];
  if (!argMainName) {
    say(callfunc(i18n.tip, [{namespace}]));
    prompts.push(
      {
        type: "confirm",
        name: "isReady",
        message: callfunc(i18n.isReady, [{destFolderName: getDestFolderName()}]),
        default: false,
      },
      {
        when: (response) => {
          const allAns = getAllAns(response);
          if (!allAns.isReady) {
            exit(() => say(callfunc(i18n.notReady)));
          }
        },
      }
    );
  }
  prompts.push({
    type: "input",
    name: "mainName",
    message: callfunc(i18n.mainName),
    default: argMainName || getDestFolderName(),
  });
  return prompts;
};

module.exports = mainNamePrompt;
