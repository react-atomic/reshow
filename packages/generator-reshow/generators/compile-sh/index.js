const getYo = require("yo-reshow");
const { YoGenerator, YoHelper, commonPrompt } = getYo();

/**
 * compile-sh Generator
 */
module.exports = class extends YoGenerator {
  writing() {
    const { cp } = YoHelper(this);
    cp("compile.sh", null, { webpackEnabled: this.options.webpackEnabled });
  }
};
