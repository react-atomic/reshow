Reshow app skeleton share files (Webpack Atomic)
===
* GIT
   * https://github.com/react-atomic/reshow/tree/main/packages/reshow-app
* NPM
   * https://www.npmjs.com/package/reshow-app


## transform-runtime (how to set reshow-transform-runtime versions?)
* Latest version check here
   * https://www.npmjs.com/package/@babel/runtime
* Other doc
   * https://www.npmjs.com/package/@babel/plugin-transform-runtime
   * https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-runtime




## for develop
* In reshow-app/build run 
```
yarn link
```

* In workspace
```
yarn link reshow-app
```

* Restore
```
yarn unlink reshow-app
```
