require('setimmediate');
const React = require('react');
const ReactDOM = require('react-dom');

const client = (app)=>
{
    const myApp = React.createFactory(app);
    setImmediate(()=>{
        let w = window;        
        let d = document;
        w.ReactDOM=ReactDOM;
        w.app=myApp;
        let data = {};
        if ('undefined' !== typeof REACT_DATA) {
            data = REACT_DATA;
        }
        ReactDOM.render(
          new myApp(data),
          d.getElementById('app')
        );
    });
}

module.exports = client;
