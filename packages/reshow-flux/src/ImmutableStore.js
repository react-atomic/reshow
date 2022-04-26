import { Map, Set, isMap, is as equal } from "immutable";
import { createReducer } from "reshow-flux-base";
import { OBJ_SIZE, KEYS, STRING } from "reshow-constant";
import callfunc from "call-func";
import toJS from "./toJS";

const getMap = (state, k) => toJS(state.get(k)) ?? {};

const forEachMap = (maybeMap, cb) => {
  if (isMap(maybeMap)) {
    maybeMap.forEach(cb);
  } else {
    if (STRING === typeof maybeMap) {
      cb(maybeMap, "type");
    } else {
      KEYS(maybeMap).forEach((k) => cb(maybeMap[k], k));
    }
  }
};

const MAP_SIZE = (maybeMap) =>
  isMap(maybeMap) ? maybeMap.size : OBJ_SIZE(maybeMap);

/**
 * Why not just use immutable mergeMap?
 * Because after merge can not use === to compare
 */
const mergeMap = (state, maybeMap) => {
  try {
    if (MAP_SIZE(maybeMap)) {
      forEachMap(maybeMap, (v, k) => {
        state = state.set(k, v);
      });
    }
  } catch (e) {}
  return state;
};

const defaultReducer = (state, action) => mergeMap(state, action);

const ImmutableStore = (reduce, initState) => {
  reduce = reduce || defaultReducer;
  initState = mergeMap(Map(), callfunc(initState));
  const [store, dispatch] = createReducer(reduce, initState);
  store.getMap = (k) => getMap(store.getState(), k);
  return [store, dispatch];
};

export default ImmutableStore;
export { Map, Set, mergeMap, equal, defaultReducer };
