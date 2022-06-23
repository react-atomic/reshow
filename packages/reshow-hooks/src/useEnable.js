import { useReducer } from "react";
import callfunc from "call-func";

/**
 * React useReducer
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 */

const useEnable = (setTo, initVal, onChange) => {
  const reducer = useReducer(
    () => callfunc(onChange, [setTo]) || setTo,
    initVal,
    (initVal) => callfunc(onChange, [initVal]) ?? initVal
  );
  return reducer;
};
export default useEnable;
