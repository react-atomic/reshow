const PATH = require("path");
const { STRING } = require("reshow-constant");

// for test
const YoTest = require("yeoman-test");
const assert = require("yeoman-assert");

const getYoUnit = () => {
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
  };
};

module.exports = getYoUnit;
