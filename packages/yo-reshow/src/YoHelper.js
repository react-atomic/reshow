import FS from "fs";
import PATH from "path";
import { STRING } from "reshow-constant";

// for app
import YoSay from "yosay";
import mkdirp from "mkdirp";
import globSync from "./globSync";
import getDotYo, {
  promptResetDefault,
  promptFilterByOptions,
} from "./getDotYo";

let lastAns;

const YoHelper = (oGen) => {
  const mkdir = (dir) => mkdirp(oGen.destinationPath(dir));
  return {
    getBuildDir: () => oGen.contextRoot,
    getDestFolderName: () => PATH.basename(oGen.destinationRoot()),
    chdir: (dir) => oGen.destinationRoot(dir),
    mkdir,

    // https://github.com/yeoman/environment/blob/main/lib/util/log.js
    say: (message) => {
      if (STRING !== typeof message) {
        oGen.log(JSON.stringify(message, null, "\t"));
      } else {
        oGen.log(YoSay(message, { maxLength: 30 }));
      }
    },

    // https://github.com/SBoudrias/mem-fs-editor
    cp: (src, dest, options) => {
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
  };
};

export default YoHelper;
