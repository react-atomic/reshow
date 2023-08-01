// @ts-check

import { useRef } from "react";
import { createReducer } from "reshow-flux-base";

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
 *
 *
 * @template StateType
 * @template ActionType
 * @param {import('reshow-flux-base').ReducerType<StateType, ActionType>} reducer
 * @param {import('reshow-flux-base').InitStateType<StateType>} [initialState]
 */
const useReduceStore = (reducer, initialState) => {
  /**
   * @type any
   */
  const lastReducer = useRef();
  if (!lastReducer.current) {
    lastReducer.current = createReducer(reducer, initialState);
  }
  return lastReducer.current;
};

export default useReduceStore;
