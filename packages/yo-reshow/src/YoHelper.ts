import * as FS from "fs";
import * as PATH from "path";
import { STRING, FUNCTION, OBJ_SIZE } from "reshow-constant";

import getDestFolderName from "./getDestFolderName";
import isFile from "./isFile";
import isDir from "./isDir";
import unlink from "./unlink";

// for app
import YoSay from "yosay";
import { mkdirp } from "mkdirp";
import globSync from "./globSync";
import handleAnswers from "./handleAnswers";
import handleKeywords from "./handleKeywords";
import { getDotYo, promptResetDefault, promptFilterByOptions } from "./getDotYo";

const lastAns: { current: Record<string, unknown> } = { current: {} };
const exitCb: { current: (() => void) | null } = { current: null };
const onExit = (cb: () => void) => cb && (exitCb.current = cb);
process.once("exit", () => {
  if (FUNCTION === typeof exitCb.current && exitCb.current !== null) {
    exitCb.current();
  }
  process.exit(0);
});

/**
 * Copy
 *
 * https://yeoman.io/authoring/file-system.html#tip-update-existing-files-content
 * https://yeoman.github.io/generator/Generator.html#readTemplate
 * https://github.com/SBoudrias/mem-fs-editor
 * https://github.com/sboudrias/mem-fs
 */
const RUN_CP = (oGen: any) => (src: string, dest?: string, options?: any, bOverwrite?: boolean) => {
  const oGenFs = oGen.fs;
  const action = options ? oGenFs.copyTpl : oGenFs.copy;

  let actualSrc: string;
  if (!isFile(src) || isFile(oGen.templatePath(src))) {
    dest = dest || (isDir(src) ? PATH.basename(src) : src);
    actualSrc = oGen.templatePath(src);
  } else {
    dest = dest || PATH.basename(src);
    actualSrc = src;
  }

  try {
    const realDestFile = oGen.destinationPath(dest);
    if (!isFile(realDestFile) || bOverwrite) {
      if (isFile(realDestFile) && bOverwrite) {
        unlink(realDestFile);
      }
      action.call(oGenFs, actualSrc, realDestFile, options);
    }
  } catch (e) {
    throw e;
  }
  return dest;
};

/**
 * SAY
 *
 * https://github.com/yeoman/environment/blob/main/lib/util/log.js
 */
const RUN_SAY =
  (oGen: any) =>
  (message: unknown, options = { maxLength: 30 }) => {
    if (STRING !== typeof message) {
      oGen.log(JSON.stringify(message, null, "\t"));
    } else {
      oGen.log(YoSay(message as string, options));
    }
  };

const promptChainLocator = (prompts: any[]) => () => prompts.shift();

const YoHelper = (oGen: any) => {
  const mkdir = (dir: string) => mkdirp(oGen.destinationPath(dir));
  const chdir = (dir: string) => oGen.destinationRoot(dir);
  const cp = RUN_CP(oGen);
  const say = RUN_SAY(oGen);

  if (!exitCb.current) {
    onExit(() => say("Bye from us!\n Chat soon."));
  }

  const promptChain = (promptLocator: any, cb?: any, nextAnswer: Record<string, unknown> = {}) => {
    cb = cb || (() => true);
    let i = 0;
    lastAns.current = nextAnswer;
    const go = (thisPrompt: any): any => {
      return thisPrompt
        ? oGen.prompt(thisPrompt).then((props: any) => {
            lastAns.current = { ...lastAns.current, ...props };
            const isContinue = cb(lastAns.current);
            if (isContinue) {
              i++;
              return go(promptLocator(i, lastAns.current));
            } else {
              return oGen.prompt([]);
            }
          })
        : OBJ_SIZE(lastAns.current)
          ? lastAns.current
          : oGen.prompt([]);
    };
    return go(promptLocator(i, lastAns));
  };

  const chainUtil = {
    mergePromptOrOption: (
      prompts: any[],
      cb = (nextPrompts: any[], nextAnswer?: any) => promptChain(promptChainLocator(nextPrompts), undefined, nextAnswer)
    ) => {
      const options = {
        ...oGen.options,
        ...getDotYo(oGen.options),
      };
      const { nextAnswer, nextPrompts } = promptFilterByOptions(
        prompts,
        options
      );
      return cb(nextPrompts, nextAnswer).then((props: any) => ({
        ...props,
        ...nextAnswer,
      }));
    },

    promptChainLocator,
    promptChain,
  };

  const syncJSON = (src: string | null, dest: string, options?: any, cb?: (json: any, options?: any) => any) => {
    if (src != null) {
      dest = cp(src, dest, options) as string;
    }
    cb = cb || ((json: any) => json);
    const json = oGen.readDestinationJSON(dest);
    const nextJson = cb(json, options);
    if (nextJson) {
      const result = oGen.writeDestinationJSON(dest, nextJson);
      return { json: nextJson, text: result };
    }
    return undefined;
  };

  return {
    say,
    cp,
    mkdir,
    getDestFolderName: () => getDestFolderName(oGen),
    chdir,
    chMainName: (name: string = oGen.mainName) => {
      if (name !== getDestFolderName(oGen)) {
        chdir(name);
      }
    },

    syncJSON,
    updateJSON: (src: string, dest: string, options?: any, cb?: any) => {
      const { json, text } = syncJSON(src, dest, options, cb) || {};
      if (text) {
        FS.writeFileSync(dest, text);
        return { json, text };
      }
      return undefined;
    },

    onExit,
    exit: (cb: () => void, statusCode = 0) => {
      onExit(cb);
      process.exit(statusCode);
    },

    getDotYo,
    isFile: (f: string) => {
      const destPath = oGen.destinationPath(f);
      if (isFile(destPath)) {
        return destPath;
      } else {
        return false;
      }
    },
    glob: (srcPath: string, ...p: any[]) => {
      const actualSrc = isDir(srcPath)
        ? srcPath
        : oGen.templatePath(srcPath || "");
      globSync(actualSrc, p[0], p[1]);
    },

    promptResetDefault,
    ...chainUtil,
    promptChainAll: (
      prompts: any[],
      { locator = chainUtil.promptChainLocator, callback }: { locator?: any; callback?: any } = {}
    ) => {
      return chainUtil.mergePromptOrOption(
        prompts,
        (nextPrompts, nextAnswer) => {
          return chainUtil.promptChain(
            locator(nextPrompts),
            callback,
            nextAnswer
          );
        }
      );
    },
    getAllAns: (customAns?: Record<string, unknown>) => {
      return { ...customAns, ...lastAns.current };
    },
    handleAnswers: handleAnswers(oGen),
    handleKeywords,
  };
};

export default YoHelper;
