// @ts-check

import getOffset from "getoffset";
import smoothScrollTo from "smooth-scroll-to";
import { doc } from "win-doc";

let goAnchorTimer;

const urlDecode = (/**@type string*/ s) => decodeURIComponent(s);

/**
 * @param {string} anchor
 * @returns {function(number?)}
 */
const goToAnchor = (anchor) => (goAnchorDelay) => {
  if (!goAnchorDelay) {
    goAnchorDelay = 0;
  }
  clearTimeout(goAnchorTimer);
  goAnchorTimer = setTimeout(() => {
    try {
      const dom = /**@type HTMLElement*/ (document.body.querySelector(anchor));
      if (dom) {
        const pos = /**@type import('getoffset').OffsetType*/ (getOffset(dom));
        smoothScrollTo(pos.top);
      }
    } catch (e) {}
  }, goAnchorDelay);
};

class AnchorPathType {
  /**
   * @type string
   */
  anchor;
  /**
   * @type string
   */
  path;
  /**
   * @type string[]
   */
  anchorArr;
  /**
   * @type string
   */
  lastAnchor;
}

/**
 * @param {string=} path
 * @returns {AnchorPathType}
 */
const getAnchorPath = (path) => {
  if (!path) {
    path = doc().URL;
  } else {
    if (0 === path.indexOf("#")) {
      path = "/" + path;
    }
  }
  const pathArr = path.split("/#/");
  if (null != pathArr[1]) {
    path = "/" + pathArr[1];
  }
  let anchor = "";
  const hashStart = path.indexOf("#");
  const anchorStart = -1 !== hashStart ? hashStart : path.indexOf("%23");
  if (-1 !== anchorStart) {
    anchor = urlDecode(path.substring(anchorStart));
    path = path.substring(0, anchorStart);
  }
  const anchorArr = anchor.split("#");
  return {
    anchor,
    path,
    anchorArr,
    lastAnchor: "#" + anchorArr[anchorArr.length - 1],
  };
};

/**
 * @param {string} rawPath
 * @returns {function(number?):string}
 */
const handleAnchor = (rawPath) => (goAnchorDelay) => {
  const { anchor, path } = getAnchorPath(rawPath);
  if (anchor) {
    goToAnchor(anchor)(goAnchorDelay);
  }
  if (-1 !== path.indexOf("?")) {
    return path.split("?")[0];
  } else {
    return path;
  }
};

/**
 * @param {string} path
 * @returns {function():string}
 */
const disableHandleAnchor = (path) => () => path;

export { goToAnchor, disableHandleAnchor, getAnchorPath };
export default handleAnchor;
