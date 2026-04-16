import mainName from "./mainNamePrompt";
import YoHelper from "./YoHelper";

const commonPrompt = {
  mainName,
  desc: (oGen: any, { keyword = true }: { keyword?: boolean } = {}) => {
    const nextPrompts: any[] = [
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
  author: (oGen: any) => [
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
    oGen: any,
    { defaultRepositoryName, defaultRepositoryOrgName }: { defaultRepositoryName?: string; defaultRepositoryOrgName?: string } = {},
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
  babel: (oGen: any) => [
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
      when: (response: any): boolean | undefined => {
        const { getAllAns } = YoHelper(oGen);
        const allAns = getAllAns(response);
        if (allAns.isUseBabel) {
          return true;
        }
        return undefined;
      },
    },
    {
      type: "confirm",
      name: "isUseBabelUI",
      message: "Is is a babel UI library?",
      default: false,
      when: (response: any): boolean | undefined => {
        const { getAllAns } = YoHelper(oGen);
        const allAns = getAllAns(response);
        if (allAns.isUseBabel) {
          return true;
        }
        return undefined;
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

export default commonPrompt;
