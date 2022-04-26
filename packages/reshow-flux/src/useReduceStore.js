import { useRef } from "react";
import { createReducer } from "reshow-flux-base";
import { Map, defaultReducer } from "./ImmutableStore";

const useReduceStore = (reduce, initState) => {
  reduce = reduce || defaultReducer;
  initState = initState || Map();
  const lastReducer = useRef();
  if (!lastReducer.current) {
    lastReducer.current = createReducer(reduce, initState);
  }
  return lastReducer.current;
};

export default useReduceStore;
