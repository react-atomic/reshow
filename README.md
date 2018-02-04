[![Build Status](https://travis-ci.org/react-atomic/reshow.svg?branch=master)](https://travis-ci.org/react-atomic/reshow) 
 Reshow (A simplified version of Flux)
===============
   * react atomic ui for atom 
   * GIT
      * https://github.com/react-atomic/reshow
   * NPM
      * https://npm.im/reshow

## Example Usage
Demo Url:
https://react-atomic-ui.js.org/

Hashtag sample
   * https://react-atomic-ui.js.org/#/organisms#organism-react-facebook 

Hightlight:
   * Reshow supoort whole link replace, but github static server only accept hashtag.
   * You could have customlize url parser for complex case such as https://npm.im/routes
      * Just need pass props.parseUrl with ClientRoute component
      * https://github.com/react-atomic/reshow/blob/master/ui/organisms/ClientRoute.jsx#L9-L23 

## Extend from ReshowComponent or ReshowRealTimeComponent
### *!!Important!!* If your class overwrited with following functions you need call parent by yourself.
   * componentDidMount
      * super.componentDidMount();
   * componentWillReceiveProps(nextProps)
      * super.componentWillReceiveProps(nextProps);
   * componentWillUnmount
      * super.componentWillUnmount();
### Safe way
The safe way was call reshow(YourComponent) again;
```
import React from 'react';
import {reshow, ReshowComponent} from reshow;

class YourComponent extends ReshowComponent
{
/* your code */
}
export default reshow(YourComponent);
```


## How to call static parent function (calculateState and getStores) by extends ReshowComponent
   * https://github.com/react-atomic/reshow/wiki/call-parent-static-function

## Dependencies
   * React Ajax
   * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/organism-react-ajax

## PHP Template
   * https://github.com/pmvc-plugin/view_react
