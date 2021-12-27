import { STRING } from "reshow-constant";
import PATH from "path";

import YoHelper from "./YoHelper";
import YoGenerator from "yeoman-generator";

// for test
import YoTest from "yeoman-test";
import assert from "yeoman-assert";

let lastAns;
const getYo = () => {
  return {
    YoGenerator,
    YoTest: ({ source, params, options = {} }) => {
      source = STRING === typeof source ? PATH.join(source) : source;
      return YoTest.create(source)
        .withPrompts(params)
        .withOptions(options)
        .inTmpDir((dir) => {
          console.log(`Build Dest on: ${dir}`);
          console.log(`Source : ${source}`);
        })
        .run();
    },
    assert,
    YoHelper
  };
};

export default getYo;
