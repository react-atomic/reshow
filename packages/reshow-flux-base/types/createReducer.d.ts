export default createReducer;
export type emiter = {
    reset: Function;
    add: Function;
    remove: Function;
    emit: Function;
};
export type state<T> = T;
export type store = {
    reset: Function;
    getState: Function;
    addListener: Function;
    removeListener: Function;
};
/**
 * @typedef {object} store
 * @property {function} reset
 * @property {function} getState
 * @property {function} addListener
 * @property {function} removeListener
 */
/**
 * @template T
 * @param {function} reduce
 * @param {state<T>|function} initState
 * @returns {[store, dispatch]}
 */
declare function createReducer<T>(reduce: Function, initState: Function | T): [store, <T_1>(action: string | object | Function, actionParams: object) => T_1];
/**
 * Transpile dispatch("your-type", {foo: "bar"})
 * to dispatch({type: "your-type", params: {foo: "bar"}})
 *
 * @template T
 * @param {string|object|function} action
 * @param {object} params
 * @param {state<T>} prevState
 * @returns {object} lazy actions
 */
export function refineAction<T>(action: string | object | Function, params: object, prevState: T): object;
