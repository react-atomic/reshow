const PATH = require("path");
const OS = require("os");
const ini = require("parse-ini-string");
const { nest } = require("object-nested");
const isFile = require("./isFile");
const fileGetContents = require("./fileGetContents");

const searchDotYo = (path) => {
  const dirs = path.split("/");
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
  const dotYo = searchDotYo(pwd);
  let data = dotYo ? getIni(dotYo) : {};
  const homeYo = PATH.join(OS.homedir(), ".yo");
  if (isFile(homeYo) && bGetHomeYo) {
    data = {
      ...getIni(homeYo),
      ...data,
    };
  }
  return data;
};

const promptResetDefault = (prompts, yoData = getDotYo()) => {
  prompts.forEach((oPrompt) => {
    const hasYoData = yoData[oPrompt.name];
    if (hasYoData) {
      oPrompt.default = hasYoData;
    }
  });
  return prompts;
};

const promptFilterByOptions = (prompts, yoData = getDotYo()) => {
  const nextAnswer = {};
  const nextPrompts = prompts.filter((oPrompt) => {
    const hasYoData = yoData[oPrompt.name];
    if (hasYoData) {
      nextAnswer[oPrompt.name] = hasYoData;
      return false;
    } else {
      return true;
    }
  });
  return { nextAnswer, nextPrompts };
};

module.exports = { getDotYo, promptResetDefault, promptFilterByOptions };
