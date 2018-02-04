require('setimmediate');
import React from 'react';
import ReactDOM from 'react-dom';

const render = (oApp, dom)=>
{
    let r;
    if (dom.innerHTML && ReactDOM.hydrate) {
        r = ReactDOM.hydrate;
    } else {
        r = ReactDOM.render;
    }
    r(
      oApp,
      dom 
    );
}

const client = (rawApp)=>
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
    });
}

export default client;
