// @ts-check
import { useRef } from "react";
import callFunc from "call-func";

/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @param {function(ValueType):ValueType} [cookCb]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
const useRefUpdate = (value, cookCb = (v) => v) => {
  const last = /** @type any*/ (useRef());
  const lastCook = /** @type any*/ (useRef());
  const nextValue = callFunc(value);
  if (last.current !== nextValue) {
    last.current = nextValue;
    lastCook.current = callFunc(cookCb, [value]);
  }
  return lastCook;
};

export default useRefUpdate;
