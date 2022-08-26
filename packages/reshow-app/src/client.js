import "array.polyfill";
import ReactDOM from "react-dom/client";
import initWorker from "reshow-worker";
import { ajaxDispatch } from "organism-react-ajax";
import { urlStore } from "reshow-url";
import { win, doc } from "win-doc";
import build from "reshow-build";
import { UNDEFINED } from "reshow-constant";

const render = (oApp, dom) => {
  if (dom.innerHTML) {
    win().Reshow.hydrate = true;
    win().Reshow.dom = dom;
    ReactDOM.hydrateRoot(dom, oApp, {
      onRecoverableError: (err) => {
        console.log(err);
      },
    });
  } else {
    ReactDOM.createRoot(dom).render(oApp);
  }
};

const update = (json) => ajaxDispatch("callback", { json });

let bInitWorker = false;

const client = (rawApp, { selector = "#app", serviceWorkerURL } = {}) => {
  const app = build(rawApp);
  win().Reshow = { render, app, update };
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
};

export default client;
