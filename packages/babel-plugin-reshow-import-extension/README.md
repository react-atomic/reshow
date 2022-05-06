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
]
```

* `Always Add Import Extensions (with white list)`

```js
plugins: [
  ["reshow-import-extension", { extMapping: {"": "js", ".example": ".example"} }],
]

// input file: xxx.example will output xxx.example.js
// input file: xxx.css will output xxx.css
```

* `Replace Import Extensions`

```js
plugins: [
  ["reshow-import-extension", { extMapping: {"js": "mjs"} }], // will replace js extension with mjs
]
```

* Whole babel.config.js

https://github.com/react-atomic/react-atomic-atom/blob/main/babel.config.js
