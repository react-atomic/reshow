export default createReducer;
export type emiter = {
    reset: Function;
    add: Function;
    remove: Function;
    emit: Function;
};
export type state<T> = T;
export type StoreType = any;
/**
 * @typedef {Object} StoreType
 */
/**
 * @template T
 * @param {function} reduce
 * @param {state<T>|function} initState
 * @returns {[StoreType, dispatch]}
 */
declare function createReducer<T>(reduce: Function, initState: Function | T): [StoreType, (action: string | object | Function, actionParams?: object) => T];
/**
 * Transpile dispatch("your-action-type", {foo: "bar"})
 * to dispatch({type: "your-action-type", params: {foo: "bar"}})
 *
 * @template T
 * @param {string|object|function} action
 * @param {object} params
 * @param {state<T>} prevState
 * @returns {object} lazy actions
 */
export function refineAction<T>(action: string | object | Function, params: object, prevState: T): object;
