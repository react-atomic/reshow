const { STRING } = require("reshow-constant");
const PATH = require("path");

const YoGenerator = require("yeoman-generator");
const YoHelper = require("./YoHelper");
const commonPrompt = require("./commonPrompt");

// for test
const YoTest = require("yeoman-test");
const assert = require("yeoman-assert");

const getYo = () => {
  return {
    YoTest: ({ source, params, options = {}, build }) => {
      source = STRING === typeof source ? PATH.join(source) : source;
      return YoTest.create(source)
        .withPrompts(params)
        .withOptions(options)
        .inTmpDir((dir) => {
          console.log(`Build Dest on: ${dir}`);
          console.log(`Source : ${source}`);
        })
        .build(build)
        .run();
    },
    assert,
    YoGenerator,
    YoHelper,
    commonPrompt,
  };
};

module.exports = getYo;
