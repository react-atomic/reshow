// @ts-check

import { useRef } from "react";
import useStore from "./useStore";
import ImmutableStore from "./ImmutableStore";

/**
 * @template StateType
 * @typedef {import("./ImmutableStore").InitStateWithMap<StateType>} InitStateWithMap
 */

/**
 * useState alternative but implement by Immutable.
 * https://reactjs.org/docs/hooks-reference.html#usestate
 *
 *
 * ## Base usage
 * const [state, setState] = useImmutable(initialState);
 *
 * call setState will trigger re-render.
 * could use setState for partial update.
 *
 * @template StateType
 * @param {InitStateWithMap<StateType>} [initialState]
 */
const useImmutable = (initialState) => {
  const lastReduce = useRef(/** @type any */ (null));
  if (!lastReduce.current) {
    lastReduce.current = ImmutableStore(null, initialState);
  }
  return [useStore(lastReduce.current[0]), lastReduce.current[1]];
};

export default useImmutable;
