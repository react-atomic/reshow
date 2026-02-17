import { sessionStorage as sStore } from "get-storage";
import { doc, win } from "win-doc";
import get from "get-object-value";

const getDocCanonicalUrl = (oDoc) => {
  oDoc = oDoc || doc();
  const canonical = oDoc.querySelector('link[rel="canonical"]');
  return canonical ? canonical.href : false;
};

const initCanonicalUrl = (props) => {
  const canonicalUrl = getDocCanonicalUrl();
  if (-1 !== doc().URL.indexOf("--disableCanonical")) {
    sStore("disableCanonical")(1);
  } else if (canonicalUrl) {
    updateCanonicalUrl(canonicalUrl, props);
  }
};

const updateCanonicalUrl = (url, props) => {
  const loc = doc().location;
  if (
    !loc ||
    get(props, ["disableCanonical"], () => sStore("disableCanonical")())
  ) {
    return;
  }
  url = url || getDocCanonicalUrl();
  if (!url) {
    return;
  }
  const newUrl = (url) => url + loc.search + loc.hash;
  if (-1 !== url.indexOf(loc.hostname)) {
    if (0 !== url.indexOf(loc.protocol)) {
      const urlArr = url.split(":");
      url = loc.protocol + urlArr[1];
    }
    const history = win().history || {};
    if (history.replaceState) {
      try {
        history.replaceState("", "", newUrl(url));
      } catch (e) {
        // jsdom and some security contexts block replaceState on certain URLs
      }
    }
  } else {
    loc.replace(newUrl(url));
  }
};

export default updateCanonicalUrl;
export { initCanonicalUrl, getDocCanonicalUrl };
