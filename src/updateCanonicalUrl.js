import {localStorage as lStore} from 'get-storage';
import {doc} from 'win-doc'; 
import get from 'get-object-value';

const updateCanonicalUrl = (url, props) => {
  const loc = doc().location;
  if (!loc || get(props, ['disableCanonical'], () => lStore('disableCanonical')())) {
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
