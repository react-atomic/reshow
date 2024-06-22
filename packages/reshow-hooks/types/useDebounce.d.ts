export default useDebounce;
export type DebounceExecutor = import("call-func").DebounceExecutor;
export type useState<T> = import("reshow-constant").useState<T>;
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
declare function useDebounce(func: Function, delay?: number | undefined, scope?: any | undefined): Function;
