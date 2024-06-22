export default useSyncChange;
export type Comparator = (a: any, b: any) => boolean;
/**
 * @callback Comparator
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
/**
 * @param {any} value
 * @param {function(any):void} setter
 * @param {any=} init
 * @param {Comparator=} comparator
 */
declare function useSyncChange(value: any, setter: (arg0: any) => void, init?: any | undefined, comparator?: Comparator | undefined): void;
