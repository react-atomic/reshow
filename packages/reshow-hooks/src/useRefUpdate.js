// @ts-check
import { useRef } from "react";

/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
const useRefUpdate = (value) => {
  const last = /** @type any*/ (useRef());
  if (last.current !== value) {
    last.current = value;
  }
  return last;
};

export default useRefUpdate;
