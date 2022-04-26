import { Map, Set, fromJS, isMap, is as equal } from "immutable";
import { createReducer } from "reshow-flux-base";
import { OBJ_SIZE } from "reshow-constant";
import callfunc from "call-func";
import toJS from "./toJS";

const getMap = (state, k) => toJS(state.get(k)) ?? {};

const toImmuteMap = (maybeMap) =>
  isMap(maybeMap) ? maybeMap : fromJS(maybeMap);

const MAP_SIZE = (maybeMap) =>
  isMap(maybeMap) ? maybeMap.size : OBJ_SIZE(maybeMap);

const mergeMap = (state, maybeMap) => {
  try {
    return MAP_SIZE(maybeMap) ? state.merge(toImmuteMap(maybeMap)) : state;
  } catch (e) {
    return state;
  }
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
