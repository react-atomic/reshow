export type RunType = (func: Function, delay?: number) => any;
/**
 * @callback RunType
 * @param {function} func
 * @param {number} [delay]
 */
/**
 * @param {boolean} [interval]
 * @returns {[RunType, function]}
 */
declare const useTimer: (interval?: boolean) => [RunType, Function];
export default useTimer;
