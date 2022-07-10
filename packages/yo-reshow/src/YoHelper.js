const FS = require("fs");
const PATH = require("path");
const { STRING, FUNCTION, OBJ_SIZE } = require("reshow-constant");

const getDestFolderName = require("./getDestFolderName");
const isFile = require("./isFile");
const isDir = require("./isDir");
const unlink = require("./unlink");

// for app
const YoSay = require("yosay");
const mkdirp = require("mkdirp");
const globSync = require("./globSync");
const handleAnswers = require("./handleAnswers");
const {
  getDotYo,
  promptResetDefault,
  promptFilterByOptions,
} = require("./getDotYo");

let lastAns;
const exitCb = { current: null };
const onExit = (cb) => cb && (exitCb.current = cb);
process.once("exit", () => {
  if (FUNCTION === typeof exitCb.current) {
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
const RUN_CP = (oGen) => (src, dest, options, bOverwrite) => {
  const oGenFs = oGen.fs;
  const action = options ? oGenFs.copyTpl : oGenFs.copy;

  let actualSrc;
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
const RUN_SAY = (oGen) => (message, options = { maxLength: 30 }) => {
  if (STRING !== typeof message) {
    oGen.log(JSON.stringify(message, null, "\t"));
  } else {
    oGen.log(YoSay(message, options));
  }
};

const YoHelper = (oGen) => {
  const mkdir = (dir) => mkdirp(oGen.destinationPath(dir));
  const chdir = (dir) => oGen.destinationRoot(dir);
  const cp = RUN_CP(oGen);
  const say = RUN_SAY(oGen);

  if (!exitCb.current) {
    onExit(() => say("Bye from us!\n Chat soon."));
  }

  const chainUtil = {
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

    promptChainLocator: (prompts) => (index) => prompts.shift(),

    promptChain: (promptLocator, cb) => {
      cb = cb || (() => true);
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
          : OBJ_SIZE(lastAns)
          ? lastAns
          : oGen.prompt([]);
      };
      return go(promptLocator(i, lastAns));
    },
  };

  return {
    say,
    cp,
    mkdir,
    getDestFolderName: () => getDestFolderName(oGen),
    chdir,
    chMainName: (name = oGen.mainName) => {
      if (name !== getDestFolderName(oGen)) {
        chdir(name);
      }
    },

    updateJSON: (src, dest, options, cb) => {
      if (src != null) {
        dest = cp(src, dest, options);
      }
      cb = cb || ((json) => json);
      const json = oGen.readDestinationJSON(dest);
      const nextJson = cb(json);
      if (nextJson) {
        const result = oGen.writeDestinationJSON(dest, nextJson);
        FS.writeFileSync(dest, result);
        return nextJson;
      }
    },

    onExit,
    exit: (cb, statusCode = 0) => {
      onExit(cb);
      process.exit(statusCode);
    },

    getDotYo,
    isFile: (f) => {
      const destPath = oGen.destinationPath(f);
      if (isFile(destPath)) {
        return destPath;
      } else {
        return false;
      }
    },
    glob: (srcPath, ...p) => {
      const actualSrc = isDir(srcPath)
        ? srcPath
        : oGen.templatePath(srcPath || "");
      globSync(actualSrc, ...p);
    },

    promptResetDefault,
    ...chainUtil,
    promptChainAll: (
      prompts,
      { locator = chainUtil.promptChainLocator, callback } = {}
    ) =>
      chainUtil.mergePromptOrOption(prompts, (nextPrompts) =>
        chainUtil.promptChain(locator(nextPrompts), callback)
      ),

    getAllAns: (customAns) => ({ ...customAns, ...lastAns }),
    handleAnswers: handleAnswers(oGen),
  };
};

module.exports = YoHelper;
