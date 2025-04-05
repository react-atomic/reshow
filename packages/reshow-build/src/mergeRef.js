//@ts-check

import * as React from "react";
import { HAS, FUNCTION } from "reshow-constant";

/**
 * @typedef {React.RefObject|Function|undefined} RefType
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
    /** @type {React.RefObject} */ (refCb).current = el;
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
