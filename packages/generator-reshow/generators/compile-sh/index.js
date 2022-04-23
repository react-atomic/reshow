const { YoGenerator, YoHelper, commonPrompt } = require("yo-reshow");

/**
 * compile-sh Generator
 */
module.exports = class extends YoGenerator {
  writing() {
    const { cp, getDotYo } = YoHelper(this);
    const { webpackEnabled } = { ...this.options, ...getDotYo(this.options) };
    cp("compile.sh", null, { webpackEnabled }, true);
  }
};
