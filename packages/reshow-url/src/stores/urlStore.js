import { ReduceStore } from "reshow-flux";
import urlDispatcher, { urlDispatch } from "../urlDispatcher";
import get from "get-object-value";
import setUrl, { getUrl, unsetUrl } from "seturl";
import { win, doc } from "win-doc";
import { ajaxDispatch, ajaxStore } from "organism-react-ajax";
import arrayDedup from "array.dedup";

const keys = Object.keys;

/**
 * Calling history.pushState() or history.replaceState() won't trigger a popstate event.
 * The popstate event is only triggered by performing a browser action, such as clicking on the back button 
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 */
const updateUrl = (url) => history.pushState && history.pushState("", "", url);

const urlChange = "urlChange";

class URL {
  loc = {};
  constructor(loc) {
    this.loc = { ...loc };
  }

  getHref(loc) {
    return this.loc.href;
  }

  get(key) {
    let value;
    if (0 === key.indexOf(":")) {
      const cookKey = key.substr(1);
      value = get(this.loc, [key.substr(1)]);
      if ("pathname" === cookKey) {
        value = value.split("/");
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
    this.group = null;
    this.groupUrlKeys = null;
    setTimeout(() => {
      const oDoc = doc();
      if (oDoc.URL) {
        urlDispatch({ type: "url", url: oDoc.URL });
        this.registerEvent(win());
      }
    });
    return new URL({});
  }

  handleUrlChange = () => {
    this.nextEmits.push(urlChange);
    urlDispatch({ type: "url", url: doc().URL });
    ajaxDispatch(urlChange);
  };

  onUrlChange(cb) {
    this.addListener(cb, urlChange);
  }

  offUrlChange(cb) {
    this.removeListener(cb, urlChange);
  }

  registerEvent(oWin) {
    if (oWin && oWin.addEventListener) {
      oWin.addEventListener("popstate", this.handleUrlChange, true);
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
    const { type, params, group } = action || {};
    switch (type) {
      case "url":
        url = get(action, ["url"], () => get(params, ["url"]));
        if (!url) {
          console.error("Not assign url", action);
        }
        break;
      case "query":
        url = oDoc.URL;
        const urlKeys = keys(params || []);
        if (this.group !== group && this.groupUrlKeys) {
          this.groupUrlKeys.forEach((key) => {
            url = unsetUrl(key, url);
          });
        }
        if (group) {
          this.groupUrlKeys =
            this.group === group
              ? arrayDedup(this.groupUrlKeys.concat(urlKeys))
              : urlKeys;
        }
        this.group = group;
        urlKeys.forEach((key) => {
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
