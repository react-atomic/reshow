'use strict';

import {Dispatcher} from 'flux';

const dispatchServer = new Dispatcher();

// dispatch server
// import dispatchServer from 'xxx';
// const instance = new PageStore(dispatchServer);
export default dispatchServer;

// dispatch notify
// import {dispatch} from 'xxx';
// dispatch({xxx:xxx});
export const dispatch = dispatchServer.dispatch.bind(dispatchServer);
