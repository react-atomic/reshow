/**
 * @template [StateType=StateMap]
 * @template [ActionType=MaybeMapType]
 *
 * @param {ReducerTypeWithMap<StateType, ActionType>?} [reducer]
 * @param {import("reshow-flux-base").InitStateType<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject<StateType, ActionType>, dispatch]}
 */
export default function ImmutableStore<StateType = StateMap, ActionType = MaybeMapType>(reducer?: ReducerTypeWithMap<StateType, ActionType> | null, initState?: import("reshow-flux-base").InitStateType<StateType>): [ImmutableStoreObject<StateType, ActionType>, import("reshow-flux-base/types/createReducer").DispatchFunction<StateType, ActionType>];
/**
 * @typedef {number|string} MapKeyType
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("reshow-flux-base").StoreObject<StateType, ActionType>} StoreObject
 */
/**
 * @typedef {import("reshow-flux-base").ActionObject} ActionObject
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
export type StoreObject<StateType, ActionType> = import("reshow-flux-base").StoreObject<StateType, ActionType>;
export type ActionObject = import("reshow-flux-base").ActionObject;
/**
 * Hack for defined this inside MaybeMapType will make null and undefined disapper
 */
export type MaybeMapObject = {
    [key: MapKeyType]: any;
};
export type MaybeMapType = string | undefined | null | StateMap | MaybeMapObject;
export type ImmutableAction = ActionObject | MaybeMapType;
export type StoreObjectWithMap = {
    getMap: (arg0: MapKeyType) => any;
};
export type ImmutableStoreObject<StateType = StateMap, ActionType = MaybeMapType> = StoreObject<StateType, ActionType> & StoreObjectWithMap;
export type ReducerTypeWithMap<StateType = StateMap, ActionType = MaybeMapType> = (state: StateType, action: ActionType) => StateType;
export type forEachCb = (Value: any, Key: any) => any;
import { is as equal } from "immutable";
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
export { equal, fromJS, Map, Set };
