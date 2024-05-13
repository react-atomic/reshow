//@ts-check

import {
  jsdom,
  cleanIt as domCleanIt,
  hideConsoleError,
  getSinon,
  sleep,
} from "reshow-unit-dom";
import { doc } from "win-doc";
import { getTimestamp } from "get-random-id";
import { getDefault } from "get-object-value";

import { waitFor, waitForElementToBeRemoved } from "@testing-library/dom";
import {
  render as rtlRender,
  cleanup,
  getQueriesForElement,
  queries,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { env } from "process";
import build from "reshow-build";
import { StrictMode, act as rtlAct } from "react";

const envStrictMode = /** @type string*/ (env.STRICT_MODE);
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
const screen = () => getQueriesForElement(doc()?.body, queries);

/**
 * @param {string} role
 * @returns {string}
 */
const getRoleHtml = (role) => screen().getByRole(role).outerHTML;

/**
 * @param {Object} [props]
 */
const cleanIt = (props) => {
  const { withoutJsdom } = props || {};
  if (!withoutJsdom) {
    domCleanIt(props);
  }
  cleanup();
};

/**
 * @param {function} cb
 */
const act = async (cb = () => {}, milliseconds = 1, debug = false) => {
  const start = getTimestamp();
  let timer;
  await rtlAct(
    () =>
      new Promise((resolve) => {
        cb();
        /**
         * @param {function} resolve
         */
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

/**
 * @typedef {Object} RenderResult
 * @property {function} html
 * @property {function} instance
 */

/**
 * rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
 *
 * @param {React.ReactElement} OrigDom
 * @param {object} options
 * @returns {import("@testing-library/react").RenderResult & RenderResult}
 */
const render = (OrigDom, options = {}) => {
  let instance = options?.instance;
  let Dom = OrigDom;
  let uInstance;
  if (instance) {
    if (true === instance) {
      /**
       * @param {React.ReactElement} el
       */
      instance = (el) => (uInstance = el);
    }
    Dom = /** @type React.ReactElement*/ (build(OrigDom)({ ref: instance }));
  }
  if (STRICT_MODE) {
    Dom = /** @type React.ReactElement*/ (build(StrictMode)(undefined, Dom));
  }
  const result = {
    ...rtlRender(Dom, options),
    html: () => result.container.innerHTML,
    instance: () => uInstance,
  };
  return result;
};

// https://testing-library.com/docs/user-event/intro
/**
 * @param {ConstructorParameters<any>} p
 */
const simulateEvent = (...p) => {
  return getDefault(userEvent).setup(...p);
};

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
