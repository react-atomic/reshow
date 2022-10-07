export default ImmutableStore;
export type StateType = {
    get: Function;
    set: Function;
};
export type MaybeMapType = StateType | any;
export type forEachCb = (Value: any, Key: number | string) => void;
export type ReducerType = (state: StateType, action: MaybeMapType) => StateType;
export type ImmutableStore = {
    getMap: Function;
};
/**
 * @typedef {Object} ImmutableStore
 * @property {function} getMap
 */
/**
 * @param {ReducerType} reduce
 * @param {MaybeMapType|function} initState
 * @returns {[store & ImmutableStore, dispatch]}
 */
declare function ImmutableStore(reduce: ReducerType, initState: MaybeMapType | Function): [import("reshow-flux-base/types/createReducer").Store & ImmutableStore, (action: string | object | Function, actionParams?: object) => any];
/**
 * @callback ReducerType
 * @param {StateType} state
 * @param {MaybeMapType} action
 * @returns {StateType}
 */
/**
 * @type ReducerType
 */
export const defaultReducer: ReducerType;
import { is as equal } from "immutable";
/**
 * @param {MaybeMapType} maybeMap
 * @param {forEachCb} cb
 */
export function forEachMap(maybeMap: MaybeMapType, cb: forEachCb): void;
import { fromJS } from "immutable";
/**
 * Why not just use immutable mergeMap?
 * Because after merge can not use === to compare
 * https://github.com/react-atomic/reshow/issues/123
 *
 * @param {StateType} state
 * @param {MaybeMapType} maybeMap
 * @returns {StateType}
 */
export function mergeMap(state: StateType, maybeMap: MaybeMapType): StateType;
import { Map } from "immutable";
import { Set } from "immutable";
export { equal, fromJS, Map, Set };
