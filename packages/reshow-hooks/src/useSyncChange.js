// @ts-check

import callfunc from "call-func";
import usePrevious from "./usePrevious";

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
const useSyncChange = (value, setter, init, comparator = (a, b) => a !== b) => {
  if (comparator(value, usePrevious(value, init))) {
    callfunc(setter, [value]);
  }
};
export default useSyncChange;
