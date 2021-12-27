import OS from "os";
import PATH from "path";
import FS from "fs";
import ini from "parse-ini-string";

const searchDotYo = (path) => {
  const dirs = path.split("/");
  while (dirs.length !== 0) {
    const curDotYo = "/" + PATH.join(...dirs, ".yo");
    if (FS.existsSync(curDotYo)) {
      return curDotYo;
    }
    dirs.pop();
  }
};

const getIni = (s) => ini(FS.readFileSync(s, "utf8"));

const getDotYo = ({ bGetHomeYo = true, pwd = process.cwd() } = {}) => {
  const dotYo = searchDotYo(pwd);
  let data = dotYo ? getIni(dotYo) : {};
  const homeYo = PATH.join(OS.homedir(), ".yo");
  if (FS.existsSync(homeYo) && bGetHomeYo) {
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
  return {nextAnswer, nextPrompts};
};

export default getDotYo;
export { promptResetDefault, promptFilterByOptions };
