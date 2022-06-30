import { useRef } from "react";
import useStore from "./useStore";
import ImmutableStore from "./ImmutableStore";

/**
 * useState alternative but implement by Immutable.
 * https://reactjs.org/docs/hooks-reference.html#usestate
 */
const useImmutable = (initState) => {
  const lastReduce = useRef();
  if (!lastReduce.current) {
    lastReduce.current = ImmutableStore(null, initState);
  }
  return [useStore(lastReduce.current[0]), lastReduce.current[1]];
};

export default useImmutable;
