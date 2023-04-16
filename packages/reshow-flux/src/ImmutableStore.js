// @ts-check

import { Map, Set, fromJS, is as equal } from "immutable";
import { createReducer, StoreObject } from "reshow-flux-base";
import { OBJ_SIZE, KEYS, STRING } from "reshow-constant";
import callfunc from "call-func";
import toJS from "./toJS";

/**
 * @typedef {number|string} MapKeyType
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
}

/**
 * @template StateType
 * @class ImmutableStoreObject
 * @extends {StoreObject<StateType>}
 * @interface
 */
class ImmutableStoreObject extends StoreObject {
  /** @type {function(MapKeyType):any} */
  getMap;
}

/**
 * @callback ReducerTypeWithMap
 * @param {StateMap} state
 * @param {import("reshow-flux-base").ActionObject} action
 * @returns {StateMap}
 */

/**
 * @typedef { StateMap | {[key: MapKeyType]: any} } MaybeMapType
 */

/**
 * @callback forEachCb
 * @param {any} Value
 * @param {unknown} Key
 * @returns {void}
 */

/**
 * @param {StateMap} state
 * @param {MapKeyType} k
 * @returns {object}
 */
const getMap = (state, k) => toJS(state.get(k)) ?? {};
const isMap = Map.isMap;

/**
 * @param {MaybeMapType} maybeMap
 * @param {function(unknown, unknown):unknown} cb
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
      KEYS(maybeMap).forEach((k) => cb(maybeMap[k], k));
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
    forEachMap(maybeMap, (v, k) => {
      state = state.set(/** @type {MapKeyType} */ (k), v);
    });
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
 * @returns {[ImmutableStoreObject<StateType>, dispatch]}
 */
const ImmutableStore = (reducer, initState) => {
  reducer = reducer || defaultReducer;
  const stateMap = mergeMap(Map(), callfunc(initState));
  const [store, dispatch] = createReducer(reducer, stateMap);
  /** @type ImmutableStoreObject<StateType> */ (store).getMap = (
    /** @type MapKeyType */ k
  ) => getMap(store.getState(), k);
  return [/** @type ImmutableStoreObject<StateType> */ (store), dispatch];
};

export default ImmutableStore;
export { defaultReducer, equal, forEachMap, fromJS, mergeMap, Map, Set };
