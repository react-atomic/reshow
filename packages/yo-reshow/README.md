Yeoman utility for reshow. (easy yeoman tool) 
===============

* GIT
   * https://github.com/react-atomic/reshow/tree/main/packages/yo-reshow
* NPM
   * https://www.npmjs.com/package/yo-reshow

## How to use
https://github.com/react-atomic/reshow/blob/main/packages/generator-reshow/generators/app/index.js

## call exit
```js
const getYo = require("yo-reshow");
const { YoGenerator, YoHelper } = getYo(); 

module.exports = class extends YoGenerator {
  initializing() {
    const { exit } = YoHelper(this);
    exit(true);
  }
};
```
