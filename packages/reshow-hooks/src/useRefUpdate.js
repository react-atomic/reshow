// @ts-check

import * as React from "react";
const { useRef } = React;
import callFunc from "call-func";
import useSyncChange from "./useSyncChange";

/**
 * @template ValueType
 * @param {ValueType|(() => ValueType)} [value]
 * @param {(v: ValueType) => ValueType} [cookCb]
 * @return {React.MutableRefObject<ValueType>}
 */
const useRefUpdate = (value, cookCb = (v) => v) => {
  const lastCook = /** @type {React.MutableRefObject<ValueType>} */ (
    useRef(null)
  );
  useSyncChange(value, (/**@type any*/ nextValue) => {
    lastCook.current = callFunc(cookCb, [nextValue]);
  });
  return lastCook;
};

export default useRefUpdate;
