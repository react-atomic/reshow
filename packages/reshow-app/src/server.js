import React from 'react';
import ReactServer from 'react-dom/server';

const server = (app)=>
{
    global.reactServer = ReactServer;
    global.app = React.createFactory(app);
};

export default server;
