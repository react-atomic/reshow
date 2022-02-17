Reshow app skeleton share files
===
* GIT
   * https://github.com/react-atomic/reshow/tree/main/packages/reshow-app
* NPM
   * https://www.npmjs.com/package/reshow-app


## transform-runtime (how to set reshow-transform-runtime versions?)
   * https://www.npmjs.com/package/@babel/plugin-transform-runtime
   * https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-runtime

## link babel config
ln -s ./node_modules/reshow-app/.babelrc

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
