import React from 'react';
import ReactDOM from 'react-dom';

const client = (app)=>
{
    const myApp = React.createFactory(app);
    setTimeout(()=>{
        let w = window;        
        let d = document;
        w.ReactDOM=ReactDOM;
        w.app=myApp;
        ReactDOM.render(
          new myApp(REACT_DATA),
          d.getElementById('app')
        );
    });
}

export default client;
