import 'setimmediate';
import 'es6-promise/auto'; // for webpack promise fixed
import React from 'react';
import ReactDOM from 'react-dom';
import initWorker from 'reshow-worker';
import {ajaxDispatch} from 'organism-react-ajax';
import {win, doc} from 'win-doc';

const render = (oApp, dom) =>
  (dom.innerHTML && ReactDOM.hydrate ? ReactDOM.hydrate : ReactDOM.render)(
    oApp,
    dom,
  );

const update = props => ajaxDispatch({type: 'callback', json: props});

let bInitWorker = false;

const client = (rawApp, selector) => {
  const app = React.createFactory(rawApp);
  setImmediate(() => {
    win().Reshow = {render, app, update};
    let data = {};
    if ('undefined' !== typeof REACT_DATA) {
      data = REACT_DATA;
    }
    const appSelector = selector || '#app';
    const attachDom = doc().querySelector(appSelector);
    if (attachDom) {
      render(new app(data), attachDom);
    }
    if (!bInitWorker) {
      initWorker();
      bInitWorker = true;
    }
  });
};

export default client;
export {render};
