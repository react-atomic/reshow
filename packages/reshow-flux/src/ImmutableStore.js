import { Map, Set, fromJS } from "immutable";
import { toJS } from "get-object-value";
import { createReducer } from "reshow-flux-base";

const ImmutableStore = (reduce, initState = Map()) => {
  const [store, dispatch] = createReducer(reduce, initState);
  store.getMap = (k) => getMap(store.getState(), k);
  return [store, dispatch];
};

const getMap = (state, k) => toJS(state.get(k)) ?? {};

const mergeMap = (state, JSArray) => state.merge(fromJS(JSArray));

export default ImmutableStore;
export { Map, Set, mergeMap };
