import {
  jsdom,
  cleanIt as domCleanIt,
  hideConsoleError,
  getSinon,
} from "reshow-unit-dom";
import { doc } from "win-doc";
import { getTimestamp } from "get-random-id";

import {
  act as rtlAct,
  render as rtlRender,
  cleanup,
  getQueriesForElement,
  queries,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import process from "process";
import build from "reshow-build";
import { StrictMode } from "react";

const { STRICT_MODE } = process.env;

// https://github.com/testing-library/react-testing-library/issues/1025
global.IS_REACT_ACT_ENVIRONMENT = true;
// https://testing-library.com/docs/queries/about/#screen
const screen = () => getQueriesForElement(doc(), queries);
const getRoleHtml = (role) => screen().getByRole(role).outerHTML;

const cleanIt = (props) => {
  const { withoutJsdom } = props || {};
  if (!withoutJsdom) {
    domCleanIt(props);
  }
  cleanup();
};

const act = async (cb, milliseconds = 1, debug) => {
  const start = getTimestamp();
  let timer;
  const wait = (resolve) => {
    const now = getTimestamp();
    debug && console.log({ debug, start, now }, now - start);
    if (milliseconds + start > now) {
      clearTimeout(timer);
      timer = setTimeout(() => wait(resolve), 1);
    } else {
      resolve();
    }
  };
  await rtlAct(
    () =>
      new Promise((resolve, reject) => {
        cb();
        wait(resolve);
      })
  );
};

// rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
const render = (OrigDom, options, ...p) => {
  let instance = options?.instance;
  let Dom = OrigDom;
  let uInstance;
  if (instance) {
    if (true === instance) {
      instance = (el) => (uInstance = el);
    }
    Dom = build(OrigDom)({ ref: instance });
  }
  if (STRICT_MODE) {
    Dom = build(StrictMode)(null, Dom);
  }
  const result = rtlRender(Dom, options, ...p);
  result.html = () => result.container.innerHTML;
  result.instance = () => uInstance;
  return result;
};

// https://testing-library.com/docs/user-event/intro
const simulateEvent = (...p) => {
  return userEvent.setup(...p);
};

export {
  waitFor,
  waitForElementToBeRemoved,
  act,
  render,
  screen,
  simulateEvent,
  getRoleHtml,
  getSinon,
  cleanIt,
  jsdom,
  hideConsoleError,
};
