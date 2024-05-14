//@ts-check

import { createReducer } from "reshow-flux-base";
import { KEYS, IS_ARRAY } from "reshow-constant";
import { ajaxDispatch, ajaxStore } from "organism-react-ajax";
import get from "get-object-value";
import setUrl, { getUrl, unsetUrl } from "seturl";
import { win, doc } from "win-doc";
import arrayDedup from "array.dedup";
import { getAnchorPath } from "../handleAnchor";

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

class MyURL {
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
  urlDispatch({ type: "url", url: doc().URL });
  ajaxDispatch(urlChange);
};

/**
 * @param {Window} oWin
 */
const registerEvent = (oWin) => {
  if (oWin && oWin.addEventListener) {
    oWin.addEventListener("popstate", onUrlChange, true);
    ajaxStore.urlDispatch = urlDispatch;
  }
};

/**
 * @param {any[]} params
 */
const getInputAnchor = (params) => {
  let anchor;
  if (IS_ARRAY(params)) {
    anchor = params["anchor"];
  } else {
    anchor = params;
  }
  return anchor;
};

const handleUrl = () => {
  const Group = {};

  const init = () => {
    Group.name = null;
    Group.urlKeys = null;
    setTimeout(() => {
      const oDoc = doc();
      if (oDoc.URL) {
        urlDispatch({ type: "url", url: oDoc.URL });
        registerEvent(win());
      }
    });
    return new MyURL();
  };

  const reduce = (/**@type any*/ state, /**@type any*/ action) => {
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
            (/**@type string*/ key) => (url = unsetUrl(key, url))
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

  return { init, reduce };
};

const oUrl = handleUrl();
const [store, urlDispatch] = createReducer(oUrl.reduce, oUrl.init);

const myStore = { ...store, registerEvent };

export default myStore;
export { urlDispatch, MyURL };
