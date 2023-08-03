// @ts-check

import { Map, Set, fromJS, is as equal } from "immutable";
import { createReducer, StoreObject, ActionObject } from "reshow-flux-base";
import { OBJ_SIZE, KEYS, STRING } from "reshow-constant";
import callfunc from "call-func";
import toJS from "./toJS";

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
 * @class ImmutableStoreObject
 * @extends {StoreObject<StateMap, ImmutableAction>}
 * @interface
 */
class ImmutableStoreObject extends StoreObject {
  /** @type {function(MapKeyType):any} */
  getMap;
}

/**
 * @callback ReducerTypeWithMap
 * @param {StateMap} state
 * @param {ImmutableAction} action
 * @returns {StateMap}
 */

/**
 * @callback forEachCb
 * @param {any} Value
 * @param {any} Key
 * @returns {any}
 */

/**
 * @param {StateMap} state
 * @param {MapKeyType} k
 * @returns {object}
 */
const getMap = (state, k) => toJS(state.get(k)) ?? {};
const isMap = Map.isMap;
/**
 * @param {any} a
 * @returns {object}
 */
const toMapType = (a) => a;

/**
 * @param {MaybeMapType} maybeMap
 * @param {forEachCb} cb
 */
const forEachMap = (maybeMap, cb) => {
  if (!MAP_SIZE(maybeMap)) {
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
      KEYS(toMapType(maybeMap)).forEach((k) => cb(maybeMap[k], k));
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
 * @param {StateMap} state
 * @param {MaybeMapType} maybeMap
 * @returns {StateMap}
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
 * @type ReducerTypeWithMap
 */
const defaultReducer = (state, action) => mergeMap(state, action);

/**
 * @template StateType
 * @param {ReducerTypeWithMap|null} [reducer]
 * @param {import("reshow-flux-base").InitStateType<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject, dispatch]}
 */
const ImmutableStore = (reducer, initState) => {
  reducer = reducer || defaultReducer;
  const stateMap = mergeMap(Map(), callfunc(initState));
  const [store, dispatch] = createReducer(reducer, stateMap);
  /**
   * @type ImmutableStoreObject
   */
  const nextStore = {
    ...store,
    getMap: (/** @type MapKeyType */ k) => getMap(store.getState(), k),
  };
  return [nextStore, dispatch];
};

export default ImmutableStore;
export { equal, forEachMap, fromJS, mergeMap, Map, Set };
