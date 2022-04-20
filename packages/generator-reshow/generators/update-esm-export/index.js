const getYo = require("yo-reshow");
const { KEYS } = require("reshow-constant");
const { YoGenerator, YoHelper, commonPrompt } = getYo();

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
    const { srcArr, appendArr, prependArr, moreKeyArr, moreValArr, pkgjson } =
      opts.exports;
    const nextExports = {};
    srcArr.forEach((v, index) => {
      const prepend = prependArr[index];
      const append = appendArr[index];
      glob(
        v,
        ({ filename }) => {
          nextExports[
            `${prepend}${filename}`
          ] = `${prepend}${filename}${append}`;
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
            if (exports[key] !== nextExports[key]) {
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
          this.log({ allDiff });
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
