// @ts-check

import { Map, Set, fromJS, is as equal } from "immutable";
import { createReducer } from "reshow-flux-base";
import { OBJ_SIZE, KEYS, STRING } from "reshow-constant";
import callfunc from "call-func";
import toJS from "./toJS";

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
  getIn;
  /** @type {function(MapKeyType):any}*/
  get;
  /** @type {function(MapKeyType, any):any}*/
  set;
  /** @type {function():any}*/
  toJS;
  /** @type {function():any}*/
  clear;
}

/**
 * @typedef {object} StoreObjectWithMap
 * @property {function(MapKeyType):any} getMap
 */

/**
 * @template [StateType=StateMap]
 * @template [ActionType=MaybeMapType]
 *
 * @typedef {StoreObject<StateType, ActionType>&StoreObjectWithMap} ImmutableStoreObject
 */

/**
 * @template [StateType=StateMap]
 * @template [ActionType=MaybeMapType]
 *
 * @callback ReducerTypeWithMap
 * @param {StateType} state
 * @param {ActionType} action
 * @returns {StateType}
 */

/**
 * @callback forEachCb
 * @param {any} Value
 * @param {any} Key
 * @returns {any}
 */

/**
 * @param {any} state
 * @param {MapKeyType} k
 * @returns {object}
 */
const getMap = (state, k) => {
  if (state && state.get) {
    return toJS(state.get(k));
  } else {
    return {};
  }
};
const isMap = Map.isMap;

/**
 * @param {MaybeMapType} maybeMap
 * @param {forEachCb} cb
 */
const forEachMap = (maybeMap, cb) => {
  if (!maybeMap || !MAP_SIZE(maybeMap)) {
    return;
  }
  if (isMap(maybeMap)) {
    maybeMap.forEach(cb);
  } else {
    if (STRING === typeof maybeMap) {
      /**
       * Use with mergeMap
       * will set string with key type such as
       * { type: "this-string" }
       */
      cb(maybeMap, "type");
    } else {
      KEYS(/**@type object*/ (maybeMap)).forEach((k) => cb(maybeMap[k], k));
    }
  }
};

/**
 * @param {MaybeMapType} maybeMap
 * @returns {number}
 */
const MAP_SIZE = (maybeMap) =>
  isMap(maybeMap) ? maybeMap.size : OBJ_SIZE(maybeMap);

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
const mergeMap = (state, maybeMap) => {
  try {
    forEachMap(
      maybeMap,
      /**
       * @param {any} v
       * @param {MapKeyType} k
       */
      (v, k) => {
        state = state.set(k, v);
      }
    );
  } catch (e) {}
  return state;
};

/**
 * @template {StateMap} StateType
 * @template {MaybeMapType} ActionType
 * @type ReducerTypeWithMap<StateType, ActionType>
 */
const defaultReducer = (state, action) => mergeMap(state, action);

/**
 * @template [StateType=StateMap]
 * @template [ActionType=MaybeMapType]
 *
 * @param {ReducerTypeWithMap<StateType, ActionType>?} [reducer]
 * @param {import("reshow-flux-base").InitStateType<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject<StateType, ActionType>, dispatch]}
 */
export default function ImmutableStore(reducer, initState) {
  const nextReducer = /**@type ReducerTypeWithMap<StateType, ActionType>*/ (
    reducer || defaultReducer
  );
  const stateMap = /**@type StateMap*/ (mergeMap(Map(), callfunc(initState)));
  const [store, dispatch] = createReducer(
    nextReducer,
    /**@type StateType*/ (stateMap)
  );

  /**
   * @type ImmutableStoreObject<StateType, ActionType>
   */
  const nextStore = {
    ...store,
    getMap: (/** @type MapKeyType */ k) => getMap(store.getState(), k),
  };
  return [nextStore, dispatch];
}

export { equal, forEachMap, fromJS, mergeMap, Map, Set };
