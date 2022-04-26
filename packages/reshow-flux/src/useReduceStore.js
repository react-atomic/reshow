import { useRef } from "react";
import { createReducer } from "reshow-flux-base";
import { Map } from "./ImmutableStore";

const useReduceStore = (reduce, initState) => {
  reduce = reduce || ((state, action) => state.set(action.type, action.params));
  initState = initState || Map();
  const lastReducer = useRef();
  if (!lastReducer.current) {
    lastReducer.current = createReducer(reduce, initState);
  }
  return lastReducer.current;
};

export default useReduceStore;
