//@ts-check
import { HAS, FUNCTION } from "reshow-constant";

/**
 * @typedef {React.MutableRefObject|Function|undefined} RefType
 */

/**
 * @typedef {React.ReactElement|HTMLElement} Element
 */

/**
 * @param {Element|null} el
 * @param {RefType} refCb
 */
const assignEl = (el, refCb) => {
  if (HAS(refCb, "current")) {
    /** @type {React.MutableRefObject} */ (refCb).current = el;
  } else if (FUNCTION === typeof refCb) {
    /** @type {Function} */ (refCb)(el);
  }
};

/**
 * @param {Element|null} el
 * @param {RefType[]} refArr
 */
export const mergeRef = (el, refArr = []) =>
  refArr.forEach((ref) => ref && assignEl(el, ref));
