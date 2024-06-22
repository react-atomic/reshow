// @ts-check

import { debounce } from "call-func";
import { useRef, useState } from "react";
import useSyncChange from "./useSyncChange";
import callFunc from "call-func";

/**
 * @typedef {import("call-func").DebounceExecutor} DebounceExecutor
 */

/**
 * @template T
 * @typedef {import("reshow-constant").useState<T>} useState
 */

/**
 * @param {Function} func
 * @param {number=} delay
 * @param {any=} scope
 * @returns {Function}
 */
const useDebounce = (func, delay, scope) => {
  /**
   * @type {React.MutableRefObject<any>}
   */
  const lastProps = useRef();

  /**
   * @type {useState<DebounceExecutor>}
   */
  const [_debounce] = useState(() => {
    lastProps.current = {
      func,
      delay,
      scope,
    };
    return debounce((/**@type any[]*/ args) => {
      callFunc(lastProps.current.func, args, lastProps.current.scope);
    }, delay);
  });

  useSyncChange(
    func,
    (v) => {
      lastProps.current.func = v;
    },
    () => lastProps.current.func
  );

  useSyncChange(
    scope,
    (v) => {
      lastProps.current.scope = v;
    },
    lastProps.current.scope
  );

  useSyncChange(
    delay,
    (v) => {
      lastProps.current.delay = v;
    },
    lastProps.current.delay
  );

  return (/**@type any[]*/ ...args) =>
    _debounce({ args: [args], delay: lastProps.current.delay });
};

export default useDebounce;
