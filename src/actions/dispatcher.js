'use strict';

import {Dispatcher} from 'reshow-flux';

const dispatcher = new Dispatcher();

/**
 * Dispatcher
 *
 * import dispatchServer from 'xxx';
 * const instance = new PageStore(dispatchServer);
 */
export default dispatcher;

/**
 * Dispatch 
 *
 * import {dispatch} from 'xxx';
 * dispatch({xxx:xxx});
 */
export const dispatch = dispatcher.dispatch.bind(dispatcher);
