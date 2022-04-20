const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");

/**
 * compile-sh Generator
 */
module.exports = class extends YoGenerator {
  writing() {
    const { cp } = YoHelper(this);
    cp("compile.sh", null, { webpackEnabled: this.options.webpackEnabled });
  }
};
