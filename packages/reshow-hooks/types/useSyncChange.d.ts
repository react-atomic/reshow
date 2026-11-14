export type Comparator = (a: any, b: any) => boolean;
/**
 * @callback Comparator
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
/**
 * @param {any} value
 * @param {(value: any) => void} setter
 * @param {any=} init
 * @param {Comparator=} comparator
 */
declare const useSyncChange: (value: any, setter: (value: any) => void, init?: any | undefined, comparator?: Comparator | undefined) => void;
export default useSyncChange;
