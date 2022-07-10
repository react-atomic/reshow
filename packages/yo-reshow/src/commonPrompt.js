const mainName = require("./mainNamePrompt");
const YoHelper = require("./YoHelper");

const commonPrompt = {
  mainName,
  desc: (oGen, { keyword = true } = {}) => {
    const nextPrompts = [
      {
        type: "input",
        name: "description",
        message: "Please input this description?",
        default: "",
      },
    ];
    if (keyword) {
      nextPrompts.push({
        type: "input",
        name: "keyword",
        message: "Please input keyword?",
        default: "",
      });
    }
    return nextPrompts;
  },
  author: (oGen) => [
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
  ],
  repository: (
    oGen,
    { defaultRepositoryName, defaultRepositoryOrgName } = {}
  ) => [
    {
      type: "input",
      name: "repositoryName",
      message: "Please input code repository name ?",
      default: defaultRepositoryName,
    },
    {
      type: "input",
      name: "repositoryOrgName",
      message: "Please input code repository organization name ?",
      default: defaultRepositoryOrgName,
    },
  ],
  babel: (oGen) => [
    {
      type: "confirm",
      name: "isUseBabel",
      message: "Do you plan use babel ?",
      default: true,
    },
    {
      type: "confirm",
      name: "babelRootMode",
      message: "will you push this under a monorepo (sub-package) ?",
      default: false,
      when: (response) => {
        const { getAllAns } = YoHelper(oGen);
        const allAns = getAllAns(response);
        if (allAns.isUseBabel) {
          return true;
        }
      },
    },
    {
      type: "confirm",
      name: "isUseWebpack",
      message: "Do you use webpack ?",
      default: false,
    },
  ],
};

module.exports = commonPrompt;
