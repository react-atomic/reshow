import { useRef } from "react";
import { createReducer } from "reshow-flux-base";
import { Map, defaultReducer } from "./ImmutableStore";

/**
 * useReducer alternative for External store.
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 *
 *
 * ## Base usage
 *
 * const [store, dispatch] = useReduceStore(reduceCallback, initial[Map|Function]);
 *
 * Call dispatch will not trigger re-render.
 */
const useReduceStore = (reduce, initialState) => {
  const lastReducer = useRef();
  if (!lastReducer.current) {
    reduce = reduce || defaultReducer;
    initialState = initialState || Map();
    lastReducer.current = createReducer(reduce, initialState);
  }
  return lastReducer.current;
};

export default useReduceStore;
