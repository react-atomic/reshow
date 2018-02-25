require('setimmediate');
import React from 'react';
import ReactDOM from 'react-dom';
import initWorker from 'reshow-worker';

const render = (oApp, dom)=>
    ((dom.innerHTML && ReactDOM.hydrate) ?
        ReactDOM.hydrate :
        ReactDOM.render)(oApp, dom)

const client = rawApp =>
{
    const app = React.createFactory(rawApp);
    setImmediate(()=>{
        const w = window;        
        const d = document;
        w.Reshow = { render, app };
        let data = {};
        if ('undefined' !== typeof REACT_DATA) {
            data = REACT_DATA;
        }
        render(
          new app(data),
          d.getElementById('app')
        );
        initWorker();
    });
}

export default client;
