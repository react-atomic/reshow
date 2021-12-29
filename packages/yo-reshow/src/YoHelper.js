import FS from "fs";
import PATH from "path";
import { STRING } from "reshow-constant";

// for app
import YoSay from "yosay";
import mkdirp from "mkdirp";
import globSync from "./globSync";
import handleAnswers from "./handleAnswers";

import getDotYo, {
  promptResetDefault,
  promptFilterByOptions,
} from "./getDotYo";

let lastAns;

/**
 * Copy
 *
 * https://yeoman.io/authoring/file-system.html#tip-update-existing-files-content
 * https://yeoman.github.io/generator/Generator.html#readTemplate
 * https://github.com/SBoudrias/mem-fs-editor
 * https://github.com/sboudrias/mem-fs
 */
const RUN_CP = (oGen) => (src, dest, options) => {
  const oGenFs = oGen.fs;
  const action = options ? oGenFs.copyTpl : oGenFs.copy;

  let actualSrc;
  if (!FS.existsSync(src)) {
    dest = dest || src;
    actualSrc = oGen.templatePath(src);
  } else {
    dest = dest || PATH.basename(src);
    actualSrc = src;
  }

  try {
    action.call(oGenFs, actualSrc, oGen.destinationPath(dest), options);
  } catch (e) {
    console.log(e);
  }
  return dest;
};

const YoHelper = (oGen) => {
  const mkdir = (dir) => mkdirp(oGen.destinationPath(dir));
  const chdir = (dir) => oGen.destinationRoot(dir);
  const getDestFolderName = () => PATH.basename(oGen.destinationRoot());
  const cp = RUN_CP(oGen);

  return {
    cp,
    mkdir,
    getDestFolderName,
    chdir,
    chMainName: (name) => {
      if (name !== getDestFolderName()) {
        chdir(name);
      }
    },

    // https://github.com/yeoman/environment/blob/main/lib/util/log.js
    say: (message) => {
      if (STRING !== typeof message) {
        oGen.log(JSON.stringify(message, null, "\t"));
      } else {
        oGen.log(YoSay(message, { maxLength: 30 }));
      }
    },

    updateJSON: (src, dest, options, cb) => {
      dest = cp(src, dest, options);
      const json = oGen.readDestinationJSON(dest);
      const nextJson = cb(json);
      if (nextJson) {
        oGen.writeDestinationJSON(dest, nextJson);
        return nextJson;
      }
    },

    glob: (srcPath, cb) => {
      const actualSrc = FS.existsSync(srcPath)
        ? srcPath
        : oGen.templatePath(srcPath || "");
      globSync(actualSrc, cb);
    },

    promptResetDefault,
    mergePromptOrOption: (prompts, cb) => {
      const options = {
        ...oGen.options,
        ...getDotYo(oGen.options),
      };
      const { nextAnswer, nextPrompts } = promptFilterByOptions(
        prompts,
        options
      );
      return cb(nextPrompts).then((props) => ({ ...props, ...nextAnswer }));
    },

    promptChainLocator: (prompts) => (index) => prompts[index],

    promptChain: (promptLocator, cb = () => true) => {
      let i = 0;
      lastAns = {};
      const go = (thisPrompt) => {
        return thisPrompt
          ? oGen.prompt(thisPrompt).then((props) => {
              lastAns = { ...lastAns, ...props };
              const isContinue = cb(lastAns);
              if (isContinue) {
                i++;
                return go(promptLocator(i, lastAns));
              } else {
                return oGen.prompt([]);
              }
            })
          : lastAns;
      };
      return go(promptLocator(i, lastAns));
    },

    getAllAns: () => lastAns,
    handleAnswers: handleAnswers(oGen),
  };
};

export default YoHelper;
