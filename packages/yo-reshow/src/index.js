import { STRING } from "reshow-constant";
import FS from "fs";

// for app
import YoGenerator from "yeoman-generator";
import YoSay from "yosay";
import mkdirp from "mkdirp";

// for test
import YoTest from "yeoman-test";
import assert from "yeoman-assert";
import path from "path";

let lastAns;
const getYo = () => {
  return {
    YoGenerator,
    YoTest: ({ source, params, options = {} }) => {
      source = STRING === typeof source ? path.join(source) : source;
      const testHelper = YoTest.create(source)
        .withPrompts(params)
        .withOptions(options)
        .inTmpDir((dir) => {
          console.log(`Build on: ${dir}`);
          console.log(`Source : ${source}`);
        })
        .run();
      return testHelper;
    },
    YoHelper: (oGen) => {
      const mkdir = (dir) => mkdirp(oGen.destinationPath(dir));
      return {
        getBuildDir: () => oGen.contextRoot,
        getDestFolderName: () => path.basename(oGen.destinationRoot()),
        chdir: (dir) => oGen.destinationRoot(dir),
        mkdir,
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
            dest = dest || path.basename(src);
            actualSrc = src;
          }

          try {
            action.call(oGenFs, actualSrc, oGen.destinationPath(dest), options);
          } catch (e) {
            console.log(e);
          }
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
    },
    assert,
  };
};

export default getYo;
