import getOffset from "getoffset";
import smoothScrollTo from "smooth-scroll-to";

let goAnchorTimer;

const urlDecode = (s) => decodeURIComponent(s);

const goToAnchor = (anchor) => (goAnchorDelay) => {
  if (!goAnchorDelay) {
    goAnchorDelay = 0;
  }
  clearTimeout(goAnchorTimer);
  goAnchorTimer = setTimeout(() => {
    const dom = document.body.querySelector(anchor);
    if (dom) {
      const pos = getOffset(dom);
      smoothScrollTo(pos.top);
    }
  }, goAnchorDelay);
};

const handleAnchor = (path) => (goAnchorDelay) => {
  let anchor;
  const hashStart = path.indexOf("#");
  const anchorStart = -1 !== hashStart ? hashStart : path.indexOf("%23");
  if (-1 !== anchorStart) {
    anchor = urlDecode(path.substring(anchorStart));
    path = path.substring(0, anchorStart);
  }
  if (anchor) {
    goToAnchor(anchor)(goAnchorDelay);
  }
  if (-1 !== path.indexOf("?")) {
    return path.split("?")[0];
  } else {
    return path;
  }
};

export { goToAnchor };
export default handleAnchor;
