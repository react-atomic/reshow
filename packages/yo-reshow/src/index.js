const PATH = require("path");

const YoGenerator = require("yeoman-generator");
const YoHelper = require("./YoHelper");
const commonPrompt = require("./commonPrompt");

const getYo = () => {
  return {
    YoGenerator,
    YoHelper,
    commonPrompt,
  };
};

module.exports = getYo;
