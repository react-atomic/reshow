const FS = require("fs");
const PATH = require("path");
const { STRING } = require("reshow-constant");

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
  exitCb.current && exitCb.current();
  process.exit(0);
});

const isFile = (f) => FS.existsSync(f);

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
  if (!isFile(src)) {
    dest = dest || src;
    actualSrc = oGen.templatePath(src);
  } else {
    dest = dest || PATH.basename(src);
    actualSrc = src;
  }

  try {
    const realDestFile = oGen.destinationPath(dest);
    if (!isFile(realDestFile) || bOverwrite) {
      action.call(oGenFs, actualSrc, realDestFile, options);
    }
  } catch (e) {
    console.log(e);
  }
  return dest;
};

/**
 * SAY
 *
 * https://github.com/yeoman/environment/blob/main/lib/util/log.js
 */
const RUN_SAY = (oGen) => (message) => {
  if (STRING !== typeof message) {
    oGen.log(JSON.stringify(message, null, "\t"));
  } else {
    oGen.log(YoSay(message, { maxLength: 30 }));
  }
};

const YoHelper = (oGen) => {
  const mkdir = (dir) => mkdirp(oGen.destinationPath(dir));
  const chdir = (dir) => oGen.destinationRoot(dir);
  const getDestFolderName = () => PATH.basename(oGen.destinationRoot());
  const cp = RUN_CP(oGen);
  const say = RUN_SAY(oGen);

  if (!exitCb.current) {
    onExit(() => say("Bye from us!\n Chat soon."));
  }

  return {
    say,
    cp,
    mkdir,
    getDestFolderName,
    chdir,
    chMainName: (name) => {
      if (name !== getDestFolderName()) {
        chdir(name);
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

    onExit,
    exit: (cb, statusCode = 0) => {
      onExit(cb);
      process.exit(statusCode);
    },

    glob: (srcPath, cb) => {
      const actualSrc = isFile(srcPath)
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

    getAllAns: (customAns) => ({ ...customAns, ...lastAns }),
    handleAnswers: handleAnswers(oGen),
  };
};

module.exports = YoHelper;
