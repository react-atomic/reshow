import { Dispatcher } from "reshow-flux";

const dispatcher = new Dispatcher();

/**
 * Dispatcher
 */
export default dispatcher;

/**
 * Dispatch
 *
 * import {storageDispatch} from 'reshow';
 * storageDispatch({xxx:yyy});
 */
export const storageDispatch = dispatcher.dispatch;
