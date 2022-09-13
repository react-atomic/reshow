// @ts-check

import { Map, Set, fromJS, is as equal } from "immutable";
import { createReducer } from "reshow-flux-base";
import { OBJ_SIZE, KEYS, STRING } from "reshow-constant";
import callfunc from "call-func";
import toJS from "./toJS";


/**
 * @typedef {object} StateType 
 * @property {function} get 
 * @property {function} set 
 */

/**
 * @typedef {StateType|Object} MaybeMapType 
 */

/**
 * @callback forEachCb
 * @param {any} Value 
 * @param {number|string} Key 
 */

/**
 * @param {StateType} state
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
 */
const MAP_SIZE = (maybeMap) =>
  isMap(maybeMap) ? maybeMap.size : OBJ_SIZE(maybeMap);

/**
 * Why not just use immutable mergeMap?
 * Because after merge can not use === to compare
 * https://github.com/react-atomic/reshow/issues/123
 *
 * @param {StateType} state
 * @param {MaybeMapType} maybeMap
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
 * @callback ReducerType 
 * @param {StateType} state
 * @param {MaybeMapType} action
 */

/**
 * @type ReducerType
 */
const defaultReducer = (state, action) => mergeMap(state, action);

/**
 * @param {ReducerType} reduce
 * @param {MaybeMapType|function} initState 
 */
const ImmutableStore = (reduce, initState) => {
  reduce = reduce || defaultReducer;
  initState = mergeMap(Map(), callfunc(initState));
  const [store, dispatch] = createReducer(reduce, initState);
  /**
   * @param {string} k 
   */
  store.getMap = (k) => getMap(store.getState(), k);
  return [store, dispatch];
};

export default ImmutableStore;
export { defaultReducer, equal, forEachMap, fromJS, mergeMap, Map, Set };
