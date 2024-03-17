/**
 * @template [StateType=StateMap]
 * @template [ActionType=MaybeMapType]
 *
 * @param {ReducerTypeWithMap<StateType, ActionType>?} [reducer]
 * @param {import("reshow-flux-base").InitStateType<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject<StateType, ActionType>, dispatch]}
 */
export default function ImmutableStore<StateType = StateMap, ActionType = MaybeMapType>(reducer?: ReducerTypeWithMap<StateType, ActionType>, initState?: import("reshow-flux-base").InitStateType<StateType>): [ImmutableStoreObject<StateType, ActionType>, import("reshow-flux-base/types/createReducer").DispatchFunction<StateType, ActionType>];
/**
 * @typedef {number|string} MapKeyType
 */
/**
 * Hack for defined this inside MaybeMapType will make null and undefined disapper
 * @typedef {{[key: MapKeyType]:any}} MaybeMapObject
 */
/**
 * @typedef {string|undefined|null|StateMap|MaybeMapObject} MaybeMapType
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
export type MapKeyType = number | string;
/**
 * Hack for defined this inside MaybeMapType will make null and undefined disapper
 */
export type MaybeMapObject = {
    [key: string]: any;
    [key: number]: any;
};
export type MaybeMapType = string | undefined | null | StateMap | MaybeMapObject;
export type ImmutableAction = ActionObject | MaybeMapType;
export type ReducerTypeWithMap<StateType = StateMap, ActionType = MaybeMapType> = (state: StateType, action: ActionType) => StateType;
export type forEachCb = (Value: any, Key: any) => any;
/**
 * @template [StateType=StateMap]
 * @template [ActionType=MaybeMapType]
 * @class ImmutableStoreObject
 * @extends {StoreObject<StateType, ActionType>}
 * @interface
 */
declare class ImmutableStoreObject<StateType = StateMap, ActionType = MaybeMapType> extends StoreObject<StateType, ActionType> {
    constructor();
    /** @type {function(MapKeyType):any} */
    getMap: (arg0: MapKeyType) => any;
}
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
 * @template {StateMap} StateType
 * @param {StateType} state
 * @param {MaybeMapType} maybeMap
 * @returns {StateType}
 */
export function mergeMap<StateType extends StateMap>(state: StateType, maybeMap: MaybeMapType): StateType;
import { Map } from "immutable";
import { Set } from "immutable";
import { ActionObject } from "reshow-flux-base";
import { StoreObject } from "reshow-flux-base";
export { equal, fromJS, Map, Set };
