import {ReduceStore} from 'reshow-flux';
import urlDispatcher, {urlDispatch} from '../urlDispatcher';
import get from 'get-object-value';
import setUrl, {getUrl, unsetUrl} from 'seturl';
import {win, doc} from 'win-doc';
import {ajaxDispatch, ajaxStore} from 'organism-react-ajax';

const keys = Object.keys;

const updateUrl = url => history.pushState && history.pushState('', '', url);

class URL {
  loc = {};
  constructor(loc) {
    this.loc = {...loc};
  }

  getHref(loc) {
    return this.loc.href;
  }

  get(key) {
    let value;
    if (0 === key.indexOf(':')) {
      const cookKey = key.substr(1);
      value = get(this.loc, [key.substr(1)]);
      if ('pathname' === cookKey) {
        value = value.split('/');
      }
    } else {
      const href = this.getHref();
      if (href) {
        value = getUrl(key, this.getHref());
      }
    }
    return value;
  }
}

class UrlStore extends ReduceStore {
  getInitialState() {
    let loc = {};
    setTimeout(() => {
      const oDoc = doc();
      if (oDoc.URL) {
        urlDispatch({type: 'url', url: oDoc.URL});
        this.registerEvent(win());
      }
    });
    return new URL({});
  }

  registerEvent(win) {
    if (win && win.addEventListener) {
      win.addEventListener(
        'popstate',
        () => {
          urlDispatch({type: 'url', url: doc().URL});
          ajaxDispatch('updateWithUrl');
        },
        true,
      );
      ajaxStore.urlDispatch = urlDispatch;
    }
  }

  reduce(state, action) {
    const oDoc = doc();
    if (!oDoc.URL) {
      return state;
    }
    let url;
    let urlV;
    const {type, params} = action || {};
    switch (type) {
      case 'url':
        url = get(action, ['url']);
        if (!url) {
          console.error('Not assign url', action);
        }
        break;
      case 'query':
        url = oDoc.URL;
        keys(get(params, null, [])).forEach(key => {
          urlV = get(params, [key]);
          url = urlV != null ? setUrl(key, urlV, url) : unsetUrl(key, url);
        });
        break;
    }
    if (url !== oDoc.URL) {
      updateUrl(url);
      return new URL(oDoc.location); // need put after updateUrl for new url effect
    } else {
      if (url !== state.getHref()) {
        return new URL(oDoc.location);
      }
      return state;
    }
  }
}

export default new UrlStore(urlDispatcher);
