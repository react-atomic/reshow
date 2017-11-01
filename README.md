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

Code:
   * [Component](https://github.com/react-atomic/react-atomic-ui/blob/master/ui/pages/index.jsx#L21-L26)
   * [Link](https://github.com/react-atomic/react-atomic-ui/blob/master/ui/organisms/Menu.jsx#L14-L16)

Hashtag sample
   * https://react-atomic-ui.js.org/#/organisms#organism-react-facebook 

Hightlight:
   * Reshow supoort whole link replace, but github static server only accept hashtag.
   * You could have customlize url parser for complex case such as https://npm.im/routes
      * Just need pass props.parseUrl with ClientRoute component
      * https://github.com/react-atomic/reshow/blob/master/ui/organisms/ClientRoute.jsx#L9-L23 

## Extend from ReshowComponent or ReshowRealTimeComponent
if your class overwrite following function you need call parent by yourself.
   * componentDidMount
      * super.componentDidMount();
   * componentWillReceiveProps(nextProps)
      * super.componentWillReceiveProps(nextProps);
   * componentWillUnmount
      * super.componentWillUnmount();


## How to call static parent function (calculateState and getStores) by extends ReshowComponent
   * https://github.com/react-atomic/reshow/wiki/call-parent-static-function

## Dependencies
   * React Ajax
   * https://github.com/react-atomic/react-atomic-organism/tree/master/packages/organism-react-ajax

## PHP Template
   * https://github.com/pmvc-plugin/view_react
