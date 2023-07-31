/**
 * @typedef {number|string} MapKeyType
 */
/**
 * @interface
 */
export class StateMap {
    /** @type {function(MapKeyType[]):any}*/
    getIn: (arg0: MapKeyType[]) => any;
    /** @type {function(MapKeyType):any}*/
    get: (arg0: MapKeyType) => any;
    /** @type {function(MapKeyType, any):any}*/
    set: (arg0: MapKeyType, arg1: any) => any;
    /** @type {function():any}*/
    toJS: () => any;
    /** @type {function():any}*/
    clear: () => any;
}
export default ImmutableStore;
export type MapKeyType = number | string;
export type ReducerTypeWithMap = (state: StateMap, action: import("reshow-flux-base").ActionObject) => StateMap;
export type MaybeMapType = StateMap | {
    [key: string]: any;
    [key: number]: any;
};
export type forEachCb = (Value: any, Key: unknown) => void;
/**
 * @template StateType
 * @param {ReducerTypeWithMap|null} [reducer]
 * @param {import("reshow-flux-base").InitStateType<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject<StateType>, dispatch]}
 */
declare function ImmutableStore<StateType>(reducer?: ReducerTypeWithMap | null, initState?: import("reshow-flux-base").InitStateType<StateType>): [ImmutableStoreObject<StateType>, import("reshow-flux-base/types/createReducer").DispatchType<StateMap>];
import { is as equal } from "immutable";
/**
 * @param {MaybeMapType} maybeMap
 * @param {function(unknown, unknown):unknown} cb
 */
export function forEachMap(maybeMap: MaybeMapType, cb: (arg0: unknown, arg1: unknown) => unknown): void;
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
/**
 * @template StateType
 * @class ImmutableStoreObject
 * @extends {StoreObject<StateType>}
 * @interface
 */
declare class ImmutableStoreObject<StateType> extends StoreObject<StateType> {
    /** @type {function(MapKeyType):any} */
    getMap: (arg0: MapKeyType) => any;
}
import { StoreObject } from "reshow-flux-base";
export { equal, fromJS, Map, Set };
