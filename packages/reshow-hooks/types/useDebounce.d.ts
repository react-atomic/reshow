export default useDebounce;
export type DebounceExecutor = import("call-func").DebounceExecutor;
/**
 * @typedef {import("call-func").DebounceExecutor} DebounceExecutor
 */
/**
 * @param {Function} func
 * @param {number=} defaultDelay
 * @param {any=} scope
 * @returns {Function}
 */
declare function useDebounce(func: Function, defaultDelay?: number | undefined, scope?: any | undefined): Function;
