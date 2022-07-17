const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");
const { KEYS } = require("reshow-constant");

/**
 * update-esm-export Generator
 */
module.exports = class extends YoGenerator {
  /**
   * Run loop (Life cycle)
   * https://yeoman.io/authoring/running-context.html#the-run-loop
   *
   * 1. initializing
   * 2. prompting
   * 3. configuring
   * 4. default
   * 5. writing
   * 6. conflicts
   * 7. install
   * 8. end
   */

  /**
   * Questions.
   *
   * https://www.alwaystwisted.com/post.php?s=using-lists-in-a-yeoman-generator
   * https://github.com/SBoudrias/Inquirer.js
   */
  async prompting() {
    const { say, exit, isFile, getDotYo, glob, updateJSON } = YoHelper(this);
    const pkg = isFile("package.json");

    const opts = getDotYo();
    if (!opts.exports) {
      return;
    }
    const {
      srcArr,
      prependArr,
      moreKeyArr,
      moreValArr,
      pkgjson,
      appendArr,
      requirePrependArr,
      requireAppendArr,
      importPrependArr,
      importAppendArr,
    } = opts.exports;
    const nextExports = {};
    srcArr.forEach((v, index) => {
      const prepend = prependArr[index];
      glob(
        v,
        ({ filename }) => {
          let content;
          if (appendArr) {
            const append = appendArr[index];
            content = `${prepend}${filename}${append}`;
          } else {
            content = {
              require: `${requirePrependArr[index]}${filename}${requireAppendArr[index]}`,
              import: `${importPrependArr[index]}${filename}${importAppendArr[index]}`,
            };
          }
          let nextKey = `${prepend}${filename}`;
          if (nextKey === "./index") {
            nextKey = ".";
          }
          nextExports[nextKey] = content;
        },
        true
      );
    });
    moreKeyArr?.forEach((v, index) => {
      nextExports[v] = moreValArr[index];
    });

    const pkgFile = isFile(pkgjson);
    if (pkgFile) {
      updateJSON(null, pkgFile, null, ({ exports = {}, ...json }) => {
        if (this.options.n) {
          const diff = {};
          KEYS(exports).forEach((key) => {
            if (
              JSON.stringify(exports[key]) !== JSON.stringify(nextExports[key])
            ) {
              diff[key] = {
                prev: exports[key],
                next: nextExports[key],
              };
            }
            if (exports[key] && nextExports[key]) {
              delete exports[key];
              delete nextExports[key];
            }
          });
          const allDiff = {
            new: nextExports,
            willClean: exports,
            modify: diff,
          };
          this.log({ ...allDiff });
          return null;
        } else {
          json.exports = nextExports;
          return json;
        }
      });
    }
  }

  writing() {}
};
