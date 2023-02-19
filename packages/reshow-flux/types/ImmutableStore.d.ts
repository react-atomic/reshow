export default ImmutableStore;
export type StateMap = {
    getIn: (arg0: (number | string)[]) => any;
    get: (arg0: any) => any;
    set: (arg0: any, arg1: any) => any;
    toJS: () => any;
};
export type MaybeMapType = StateMap | object;
export type forEachCb = (Value: any, Key: number | string) => void;
export type ReducerType = (state: StateMap, action: MaybeMapType) => StateMap;
export type ImmutableStoreObject<StateType> = object & import("reshow-flux-base/types/createReducer").StoreObject<StateType>;
export type InitStateMap<StateType> = MaybeMapType | import("reshow-flux-base/types/createReducer").InitStateType<StateType>;
/**
 * @template StateType
 * @typedef {object&import("reshow-flux-base/types/createReducer").StoreObject<StateType>} ImmutableStoreObject
 * @property {function(string):any} getMap
 */
/**
 * @template StateType
 * @typedef {MaybeMapType|import("reshow-flux-base/types/createReducer").InitStateType<StateType>} InitStateMap
 */
/**
 * @template StateType
 * @param {ReducerType} [reducer]
 * @param {InitStateMap<StateType>} [initState]
 * @returns {[ImmutableStoreObject<StateType>, dispatch]}
 */
declare function ImmutableStore<StateType>(reducer?: ReducerType, initState?: any): [any, (action: import("reshow-flux-base/types/createReducer").ActionType, actionParams?: object) => any];
/**
 * @callback ReducerType
 * @param {StateMap} state
 * @param {MaybeMapType} action
 * @returns {StateMap}
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
 * @param {StateMap} state
 * @param {MaybeMapType} maybeMap
 * @returns {StateMap}
 */
export function mergeMap(state: StateMap, maybeMap: MaybeMapType): StateMap;
import { Map } from "immutable";
import { Set } from "immutable";
export { equal, fromJS, Map, Set };
