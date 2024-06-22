// @ts-check

import { debounce } from "call-func";
import { useRef } from "react";
import useSyncChange from "./useSyncChange";

/**
 * @typedef {import("call-func").DebounceExecutor} DebounceExecutor
 */

/**
 * @param {Function} func
 * @param {number=} defaultDelay
 * @param {any=} scope
 * @returns {Function}
 */
const useDebounce = (func, defaultDelay, scope) => {
  /**
   * @type {React.MutableRefObject<DebounceExecutor|undefined>}
   */
  const _debounce = useRef();
  useSyncChange(func, (nextFunc) => {
    _debounce.current = debounce(nextFunc, defaultDelay);
  });

  return (/**@type any[]*/ ...args) =>
    _debounce.current && _debounce.current({ scope, args });
};

export default useDebounce;
