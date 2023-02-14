//@ts-check
import { HAS, FUNCTION } from "reshow-constant";

/**
 * @typedef {React.MutableRefObject|function} RefCbType
 */

/**
 * @typedef {React.ReactElement|HTMLElement} Element
 */

/**
 * @param {Element} el
 * @param {RefCbType} refCb
 */
const assignEl = (el, refCb) => {
  if (HAS(refCb, "current")) {
    /** @type {React.MutableRefObject} */ (refCb).current = el;
  } else if (FUNCTION === typeof refCb) {
    /** @type {function} */ (refCb)(el);
  }
};

/**
 * @param {Element} el
 * @param {RefCbType[]} refArr
 */
export const mergeRef = (el, refArr = []) =>
  refArr.forEach((ref) => ref && assignEl(el, ref));
