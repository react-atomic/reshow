'use strict';

import {Dispatcher} from 'flux';

const instance = new Dispatcher();

// dispatch server
// import dispatchServer from 'xxx';
// const instance = new PageStore(dispatchServer);
export default instance;

// dispatch notify
// import {dispatch} from 'xxx';
// dispatch({xxx:xxx});
export const dispatch = instance.dispatch.bind(instance);
