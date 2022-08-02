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

const envStrictMode = process.env.STRICT_MODE;
const STRICT_MODE =
  -1 !== "|true|false|null|0|".indexOf(envStrictMode)
    ? JSON.parse(envStrictMode)
    : envStrictMode;

if (STRICT_MODE) {
  console.log("STRICT_MODE: on");
}

/**
 * Fix!!
 * `The current testing environment is not configured to support act(…)`
 *
 * @see https://github.com/testing-library/react-testing-library/issues/1025
 * @see https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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
  await rtlAct(
    () =>
      new Promise((resolve, reject) => {
        cb();
        const wait = (resolve) => {
          const now = getTimestamp();
          debug && console.log({ during: now - start, debug, start, now });
          if (milliseconds + start > now) {
            clearTimeout(timer);
            timer = setTimeout(() => wait(resolve), 1);
          } else {
            resolve();
          }
        };
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

const sleep = (cb, delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, delay);
  });

export {
  waitFor,
  waitForElementToBeRemoved,
  act,
  render,
  screen,
  simulateEvent,
  sleep,
  getRoleHtml,
  getSinon,
  cleanIt,
  jsdom,
  hideConsoleError,
};
