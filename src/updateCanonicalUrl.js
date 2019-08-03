import {sessionStorage as sStore} from 'get-storage';
import {doc} from 'win-doc'; 
import get from 'get-object-value';

const getDocCanonicalUrl = oDoc => {
  oDoc = oDoc || doc();
  const canonical = oDoc.querySelector('link[rel="canonical"]');
  return canonical ? canonical.href : false;
}

const initCanonicalUrl = props => {
    const canonicalUrl = getDocCanonicalUrl();
    if (-1 !== doc().URL.indexOf('--disableCanonical')) {
      sStore('disableCanonical')(1);
    } else if (canonicalUrl) {
      updateCanonicalUrl(canonicalUrl, props);
    }
}

const updateCanonicalUrl = (url, props) => {
  const loc = doc().location;
  if (!loc || get(props, ['disableCanonical'], () => sStore('disableCanonical')())) {
    return;
  }
  url = url || getDocCanonicalUrl();
  if (!url) {
    return;
  }
  const newUrl = url + loc.search + loc.hash;
  if (-1 !== url.indexOf(loc.hostname)) {
    history.replaceState && history.replaceState('', '', newUrl);
  } else {
    loc.replace(newUrl);
  }
};

export default updateCanonicalUrl;
export {initCanonicalUrl, getDocCanonicalUrl};
