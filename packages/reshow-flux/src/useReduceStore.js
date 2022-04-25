import { useRef } from "react";
import { createReducer } from "reshow-flux-base";

const useReduceStore = (reduce, initState) => {
  const lastReducer = useRef();
  if (!lastReducer.current) {
    lastReducer.current = createReducer(reduce, initState);
  }
  return lastReducer.current;
};

export default useReduceStore;
