//@ts-check

import { createReducer } from "reshow-flux-base";
import { KEYS } from "reshow-constant";
import { ajaxDispatch, ajaxStore } from "organism-react-ajax";
import get from "get-object-value";
import setUrl, { getUrl, unsetUrl } from "seturl";
import { win, doc } from "win-doc";
import arrayDedup from "array.dedup";
import { getAnchorPath } from "anchor-lib";

/**
 * Calling history.pushState() or history.replaceState() won't trigger a popstate event.
 * The popstate event is only triggered by performing a browser action, such as clicking on the back button
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * @param {string} url
 */
const updateUrl = (url) =>
  win().history.pushState && win().history.pushState("", "", url);

const urlChange = "urlChange";

export class MyURL {
  loc = {};
  /**
   * @param {Location=} loc
   */
  constructor(loc) {
    if (loc) {
      this.loc = { ...loc };
    }
  }

  getHref() {
    return this.loc.href;
  }

  /**
   * @param {string} key
   * @returns {string}
   */
  getLocKey(key) {
    return key.substring(1);
  }

  /**
   * @param {string} key
   */
  get(key) {
    let value;
    if (0 === key.indexOf(":")) {
      const locKey = this.getLocKey(key);
      value = get(this.loc, [locKey], "");
      if ("pathname" === locKey) {
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

const onUrlChange = () => {
  myStore.current?.dispatch({ type: "url", url: doc().URL });
  ajaxDispatch(urlChange);
};

/**
 * @param {Window} oWin
 */
const registerEvent = (oWin) => {
  if (oWin && oWin.addEventListener) {
    oWin.addEventListener("popstate", onUrlChange, true);
    ajaxStore.urlDispatch = /**@type DispatchFunction*/ (
      myStore.current?.dispatch
    );
  }
};

/**
 * @param {any[]} params
 */
const getInputAnchor = (params) => {
  let anchor;
  if ("string" === typeof params) {
    anchor = params;
  } else {
    anchor = params["anchor"];
  }
  return anchor;
};

const handleUrl = () => {
  const Group = {};

  const getInitialState = () => {
    Group.name = null;
    Group.urlKeys = null;
    setTimeout(() => {
      const oDoc = doc();
      if (oDoc.URL) {
        myStore.current?.dispatch({ type: "url", url: oDoc.URL });
        registerEvent(win());
      }
    });
    return new MyURL();
  };

  const reducer = (/**@type any*/ state, /**@type any*/ action) => {
    const oDoc = doc();
    if (!oDoc.URL) {
      return state;
    }
    let url;
    let urlV;
    const { type, group, ...otherParams } = action || {};
    const params = get(action, ["params"], otherParams);
    switch (type) {
      case "url":
        url = get(action, ["url"], () => get(params, ["url"]));
        if (!url) {
          console.error("Not assign url", action);
        }
        break;
      case "anchor":
        url = "#" + getInputAnchor(params);
        break;
      case "resetAnchor":
        const unsetAnchor = getInputAnchor(params);
        const { anchorArr } = getAnchorPath();
        url = anchorArr
          .filter((anchorItem) => anchorItem !== unsetAnchor)
          .join("#");
        break;
      case "query":
      default:
        url = oDoc.URL;
        const urlKeys = KEYS(params || []);
        if (Group.name !== group && Group.urlKeys) {
          Group.urlKeys.forEach(
            (/**@type string*/ key) => (url = unsetUrl(key, url)),
          );
          Group.urlKeys = null;
        }
        if (group) {
          Group.urlKeys =
            Group.name === group
              ? arrayDedup(Group.urlKeys.concat(urlKeys))
              : urlKeys;
        }
        Group.name = group;
        urlKeys.forEach((key) => {
          urlV = get(params, [key]);
          url = urlV != null ? setUrl(key, urlV, url) : unsetUrl(key, url);
        });
        break;
    }
    if (url !== oDoc.URL) {
      updateUrl(url);
      return new MyURL(oDoc.location); // need put after updateUrl for new url effect
    } else {
      if (url !== state.getHref()) {
        return new MyURL(oDoc.location);
      }
      return state;
    }
  };

  return { getInitialState, reducer };
};

const myStore = {
  /**
   * @type {UrlReducer?}
   */
  current: null,
};

/**
 * @typedef {import("reshow-flux-base").DispatchFunction<any, any>} DispatchFunction
 */

/**
 * @typedef {import("reshow-flux-base").StoreObject<any, any>&object} StoreObject
 * @property {Function} registerEvent
 */

/**
 * @typedef {object} UrlReducer
 * @property {StoreObject} store
 * @property {DispatchFunction} dispatch
 */

/**
 * @returns {UrlReducer}
 */
export default function getUrlReducer() {
  if (null == myStore.current) {
    const oUrl = handleUrl();
    const [store, dispatch] = createReducer(oUrl.reducer, oUrl.getInitialState);
    myStore.current = {
      store: { ...store, registerEvent },
      dispatch,
    };
  }
  return myStore.current;
}
