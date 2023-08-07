/**
 * @typedef {number|string} MapKeyType
 */
/**
 * @typedef { StateMap | {[key: MapKeyType]: any} | string } MaybeMapType
 */
/**
 * @typedef {ActionObject|MaybeMapType} ImmutableAction
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
export type MaybeMapType = string | StateMap | {
    [key: string]: any;
    [key: number]: any;
};
export type ImmutableAction = ActionObject | MaybeMapType;
export type ReducerTypeWithMap = (state: StateMap, action: ImmutableAction) => StateMap;
export type forEachCb = (Value: any, Key: any) => any;
/**
 * @template StateType
 * @param {ReducerTypeWithMap|null} [reducer]
 * @param {import("reshow-flux-base").InitStateType<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject, dispatch]}
 */
declare function ImmutableStore<StateType>(reducer?: ReducerTypeWithMap | null, initState?: import("reshow-flux-base").InitStateType<StateType>): [ImmutableStoreObject, import("reshow-flux-base/types/createReducer").DispatchType<StateMap, ImmutableAction>];
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
import { ActionObject } from "reshow-flux-base";
/**
 * @class ImmutableStoreObject
 * @extends {StoreObject<StateMap, ImmutableAction>}
 * @interface
 */
declare class ImmutableStoreObject extends StoreObject<StateMap, ImmutableAction> {
    constructor();
    /** @type {function(MapKeyType):any} */
    getMap: (arg0: MapKeyType) => any;
}
import { StoreObject } from "reshow-flux-base";
export { equal, fromJS, Map, Set };
