const PATH = require("path");
const { STRING } = require("reshow-constant");

// for test
const YoTestLib = require("yeoman-test");
const assert = require("yeoman-assert");

const YoTest = ({ source, params, options = {}, build }) => {
  const isStringSource = STRING === typeof source;
  source = isStringSource ? PATH.join(source) : source;
  const sourceName = isStringSource ? source : source.name;
  return YoTestLib.create(source)
    .withPrompts(params)
    .withOptions(options)
    .inTmpDir((dir) => {
      console.log(`Build Dest on: ${dir}`);
      console.log(`Source : ${sourceName}`);
    })
    .build(build)
    .run();
};

module.exports = {
  YoTest,
  assert,
};
