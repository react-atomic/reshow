// @ts-check

import { useReducer } from "react";
import callfunc from "call-func";

/**
 * React useReducer
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 */

/**
 * @param {any} setTo
 * @param {any} [initVal]
 * @param {function} [onChange]
 * @returns {reducer}
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
