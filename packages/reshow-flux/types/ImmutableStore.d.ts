/**
 * @interface
 */
export class StateMap {
    /** @type {function((number|string)[]):any}*/
    getIn: (arg0: (number | string)[]) => any;
    /** @type {function(any):any}*/
    get: (arg0: any) => any;
    /** @type {function(any, any):any}*/
    set: (arg0: any, arg1: any) => any;
    /** @type {function():any}*/
    toJS: () => any;
}
export default ImmutableStore;
export type ReducerTypeWithMap = (state: StateMap, action: import("reshow-flux-base").ActionObject) => StateMap;
export type MaybeMapType = StateMap | object;
export type forEachCb = (Value: any, Key: unknown) => void;
export type ImmutableStoreObject<StateType> = object & import("reshow-flux-base").StoreObject<StateType>;
export type InitStateWithMap<StateType> = MaybeMapType | import("reshow-flux-base").InitStateType<StateType>;
/**
 * @template StateType
 * @typedef {object&import("reshow-flux-base").StoreObject<StateType>} ImmutableStoreObject
 * @property {function(string):any} getMap
 */
/**
 * @template StateType
 * @typedef {MaybeMapType|import("reshow-flux-base").InitStateType<StateType>} InitStateWithMap
 */
/**
 * @template StateType
 * @param {ReducerTypeWithMap|null} [reducer]
 * @param {InitStateWithMap<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject<StateType>, dispatch]}
 */
declare function ImmutableStore<StateType>(reducer?: ReducerTypeWithMap | null, initState?: any): [any, (action: import("reshow-flux-base/types/createReducer").DispatchAction, actionParams?: import("reshow-flux-base/types/createReducer").Payload) => any];
/**
 * @type ReducerTypeWithMap
 */
export const defaultReducer: ReducerTypeWithMap;
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
