// @ts-check

import { debounce } from "call-func";
import useRefUpdate from "./useRefUpdate";

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
  const _debounce = useRefUpdate(debounce(func, defaultDelay));
  return (/**@type any[]*/ ...args) =>
    _debounce.current && _debounce.current({ scope, args });
};

export default useDebounce;
