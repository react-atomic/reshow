Reshow app skeleton share files
===
* GIT
   * https://github.com/react-atomic/reshow/tree/master/packages/reshow-app
* NPM
   * https://www.npmjs.com/package/reshow-app

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
