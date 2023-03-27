// @ts-check

import { Map, Set, fromJS, is as equal } from "immutable";
import { createReducer } from "reshow-flux-base";
import { OBJ_SIZE, KEYS, STRING } from "reshow-constant";
import callfunc from "call-func";
import toJS from "./toJS";

/**
 * @typedef {object} StateMap
 * @property {function((number|string)[]):any} getIn
 * @property {function(any):any} get
 * @property {function(any, any):any} set
 * @property {function():any} toJS
 */

/**
 * @typedef {StateMap|object} MaybeMapType
 */

/**
 * @callback forEachCb
 * @param {any} Value
 * @param {unknown} Key
 * @returns {void}
 */

/**
 * @param {StateMap} state
 * @param {string} k
 * @returns {object}
 */
const getMap = (state, k) => toJS(state.get(k)) ?? {};
const isMap = Map.isMap;

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
      state = state.set(k, v);
    });
  } catch (e) {}
  return state;
};

/**
 * @callback ReducerTypeWithMap
 * @param {StateMap} state
 * @param {import("reshow-flux-base").ActionObject} action
 * @returns {StateMap}
 */

/**
 * @type ReducerTypeWithMap
 */
const defaultReducer = (state, action) => mergeMap(state, action);

/**
 * @template StateType
 * @typedef {object&import("reshow-flux-base/types/createReducer").StoreObject<StateType>} ImmutableStoreObject
 * @property {function(string):any} getMap
 */

/**
 * @template StateType
 * @typedef {MaybeMapType|import("reshow-flux-base/types/createReducer").InitStateType<StateType>} InitStateWithMap
 */

/**
 * @template StateType
 * @param {ReducerTypeWithMap|null} [reducer]
 * @param {InitStateWithMap<StateType>} [initState]
 *
 * @returns {[ImmutableStoreObject<StateType>, dispatch]}
 */
const ImmutableStore = (reducer, initState) => {
  reducer = reducer || defaultReducer;
  initState = mergeMap(Map(), callfunc(initState));
  const [store, dispatch] = createReducer(reducer, initState);
  /** @type ImmutableStoreObject<StateType> */ (store).getMap = (
    /** @type string */ k
  ) => getMap(store.getState(), k);
  return [store, dispatch];
};

export default ImmutableStore;
export { defaultReducer, equal, forEachMap, fromJS, mergeMap, Map, Set };
