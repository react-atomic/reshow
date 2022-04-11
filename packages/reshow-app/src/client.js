import "setimmediate";
import "array.polyfill";
import "es6-promise/auto"; // for webpack promise fixed
import React from "react";
import ReactDOM from "react-dom/client";
import initWorker from "reshow-worker";
import { ajaxDispatch } from "organism-react-ajax";
import { urlStore } from "reshow-url";
import { win, doc } from "win-doc";
import build from "reshow-build";
import { UNDEFINED } from "reshow-constant";

const render = (oApp, dom) => {
  const onlyRender = () => ReactDOM.createRoot(dom).render(oApp);
  if (dom.innerHTML) {
    win().Reshow.hydrate = true;
    ReactDOM.hydrateRoot(dom, oApp, {
      onRecoverableError: (...p) => {
        console.log(p);
      },
    });
  } else {
    onlyRender();
  }
};

const update = (json) => ajaxDispatch("callback", { json });

let bInitWorker = false;

const client = (rawApp, { selector = "#app", serviceWorkerURL } = {}) => {
  const app = build(rawApp);
  win().Reshow = { render, app, update };
  setImmediate(() => {
    const data = UNDEFINED !== typeof REACT_DATA ? REACT_DATA : {};
    const attachDom = doc().querySelector(selector);
    if (attachDom) {
      render(app(data), attachDom);
    }
    if (!bInitWorker) {
      serviceWorkerURL = serviceWorkerURL ?? data.serviceWorkerURL;
      initWorker({ serviceWorkerURL });
      bInitWorker = true;
    }
  });
};

export default client;
export { render };
