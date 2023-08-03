// @ts-check
import { useRef, useState } from "react";
import callfunc from "call-func";

/**
 * @template ValueType
 * @param {ValueType|function():ValueType} [value]
 * @return {React.MutableRefObject<ValueType|undefined>}
 */
const useRefInitCallback = (value) => {
  /**
   * @type {React.MutableRefObject<ValueType|undefined>}
   */
  const last = useRef();
  useState(()=> {
    last.current = callfunc(value)
  });
  return last;
};

export default useRefInitCallback;
