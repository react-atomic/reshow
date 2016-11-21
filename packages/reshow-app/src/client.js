import React from 'react';

const client = (app)=>
{
    const myApp = React.createFactory(app);
    setTimeout(()=>{
          require(['react-dom'],(ReactDOM)=>{ 
              window.ReactDOM=ReactDOM;
              window.app=myApp;
              ReactDOM.render(
                new myApp(REACT_DATA),
                document.getElementById('app')
              );
          });
    });
}

export default client;
