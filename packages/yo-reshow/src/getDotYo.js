const PATH = require("path");
const OS = require("os");
const ini = require("parse-ini-string");
const { nest } = require("object-nested");
const isFile = require("./isFile");
const fileGetContents = require("./fileGetContents");

const searchDotYo = (path, isRoot) => {
  const dirs = path.split("/");
  if (isRoot) {
    dirs.pop();
  }
  while (dirs.length !== 0) {
    const curDotYo = "/" + PATH.join(...dirs, ".yo");
    if (isFile(curDotYo)) {
      return curDotYo;
    }
    dirs.pop();
  }
};

const getIni = (f) => nest(ini(fileGetContents(f)), "_");

const getDotYo = ({ bGetHomeYo = true, pwd = process.cwd() } = {}) => {
  const homeYo = PATH.join(OS.homedir(), ".yo");
  let homeData;
  if (isFile(homeYo) && bGetHomeYo) {
    homeData = getIni(homeYo);
  }
  const rootYo = searchDotYo(pwd, true);
  let rootData;
  if (isFile(rootYo)) {
    rootData = getIni(rootYo);
  }
  const dotYo = searchDotYo(pwd);
  const data = dotYo ? getIni(dotYo) : {};
  const finalData = {
    ...homeData,
    ...rootData,
    ...data,
  };
  return finalData;
};

const promptResetDefault = (prompts, yoData = getDotYo()) => {
  prompts.forEach((oPrompt) => {
    const hasYoData = yoData[oPrompt.name];
    if (null != hasYoData) {
      oPrompt.default = hasYoData;
    }
  });
  return prompts;
};

const promptFilterByOptions = (prompts, yoData = getDotYo()) => {
  const nextAnswer = {};
  const nextPrompts = prompts.filter((oPrompt) => {
    const hasYoData = yoData[oPrompt.name];
    if (null != hasYoData) {
      nextAnswer[oPrompt.name] = hasYoData;
      return false;
    } else {
      return true;
    }
  });
  return { nextAnswer, nextPrompts };
};

module.exports = { getDotYo, promptResetDefault, promptFilterByOptions };
