import * as PATH from "path";
import * as OS from "os";
import ini from "parse-ini-string";
import { nest } from "object-nested";
import isFile from "./isFile";
import fileGetContents from "./fileGetContents";

const searchDotYo = (path: string, isRoot?: boolean): string | undefined => {
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
  return undefined;
};

const getIni = (f: string): Record<string, unknown> =>
  nest(ini(fileGetContents(f) as string), "_") as Record<string, unknown>;

const getDotYo = ({ bGetHomeYo = true, pwd = process.cwd() }: { bGetHomeYo?: boolean; pwd?: string } = {}): Record<string, unknown> => {
  const homeYo = PATH.join(OS.homedir(), ".yo");
  let homeData: Record<string, unknown> | undefined;
  if (isFile(homeYo) && bGetHomeYo) {
    homeData = getIni(homeYo);
  }
  const rootYo = searchDotYo(pwd, true);
  let rootData: Record<string, unknown> | undefined;
  if (rootYo && isFile(rootYo)) {
    rootData = getIni(rootYo);
  }
  const dotYo = searchDotYo(pwd);
  const data = dotYo ? getIni(dotYo) : {};
  return {
    ...homeData,
    ...rootData,
    ...data,
  };
};

const promptResetDefault = (prompts: any[], yoData: Record<string, unknown> = getDotYo()): any[] => {
  prompts.forEach((oPrompt) => {
    const hasYoData = yoData[oPrompt.name];
    if (null != hasYoData) {
      oPrompt.default = hasYoData;
    }
  });
  return prompts;
};

const promptFilterByOptions = (
  prompts: any[],
  yoData: Record<string, unknown> = getDotYo()
): { nextAnswer: Record<string, unknown>; nextPrompts: any[] } => {
  const nextAnswer: Record<string, unknown> = {};
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

export { getDotYo, promptResetDefault, promptFilterByOptions };
