# `babel-plugin-reshow-import-extension`

> A tool help u add or replace local import extensions.

## Repository 
* `GIT`
   * https://github.com/react-atomic/reshow/tree/main/packages/babel-plugin-reshow-import-extension
* `NPM`
   * https://www.npmjs.com/package/babel-plugin-reshow-import-extension

## Usage

* `Add Import Extensions`

```js
plugins: [
  ["reshow-import-extension", { extMapping: {"": "js"} }], // will add js extension
];
```

* `Replace Import Extensions`

```js
plugins: [
  ["reshow-import-extension", { extMapping: {"js": "mjs"} }], // will replace js extension with mjs
];
```

* Whole babel.config.js

https://github.com/react-atomic/react-atomic-atom/blob/main/babel.config.js
