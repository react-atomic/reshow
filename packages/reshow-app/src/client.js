require('setimmediate');
import React from 'react';
import ReactDOM from 'react-dom';
import initWorker from 'reshow-worker';
import {ajaxDispatch} from 'organism-react-ajax';

const render = (oApp, dom)=>
    ((dom.innerHTML && ReactDOM.hydrate) ?
        ReactDOM.hydrate :
        ReactDOM.render)(oApp, dom)

const update = props => ajaxDispatch({type: 'callback', json: props});

const client = rawApp =>
{
    const app = React.createFactory(rawApp);
    setImmediate(()=>{
        const w = window;        
        const d = document;
        w.Reshow = { render, app, update };
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
