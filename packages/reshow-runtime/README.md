babel runtime alternative 
===============

* GIT
   * https://github.com/react-atomic/reshow/tree/master/packages/reshow-runtime
* NPM
   * https://www.npmjs.com/package/reshow-runtime

## babel7 issue 
* Symbol not defined in ie11
   * https://github.com/babel/babel/blob/master/packages/babel-runtime/helpers/esm/iterableToArray.js
* When babel7 runtime already support useESModules, keep reshow-runtime for babel6 
   * https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules

## moduleName
* options
   * 6.0
      * moduleName
  * 7.0
     * absoluteRuntime 
* Babel source code
  * https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/index.js
* Babel mandarin
  * https://www.babeljs.cn/docs/plugins/transform-runtime/

