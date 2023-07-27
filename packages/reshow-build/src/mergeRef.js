//@ts-check
import { HAS, FUNCTION } from "reshow-constant";

/**
 * @typedef {React.MutableRefObject|function|undefined} RefCbType
 */

/**
 * @typedef {React.ReactElement|HTMLElement} Element
 */

/**
 * @param {Element|null} el
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
 * @param {Element|null} el
 * @param {RefCbType[]} refArr
 */
export const mergeRef = (el, refArr = []) =>
  refArr.forEach((ref) => ref && assignEl(el, ref));
