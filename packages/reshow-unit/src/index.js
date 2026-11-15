//@ts-check

import * as React from "react";

import {
  jsdom,
  cleanIt as domCleanIt,
  hideConsoleError,
  hideConsoleWarn,
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
// @ts-expect-error -- the `process` polyfill ships without type declarations
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
/** @type {any} */ (globalThis).IS_REACT_ACT_ENVIRONMENT = true;

// https://testing-library.com/docs/queries/about/#screen
const screen = () => getQueriesForElement(doc()?.body, queries);

/**
 * @param {string} role
 * @returns {string}
 */
const getRoleHtml = (role) => screen().getByRole(role).outerHTML;

/**
 * @param {{withoutJsdom?: boolean, debug?: any}} [props]
 */
const cleanIt = (props) => {
  const { withoutJsdom } = props || {};
  cleanup();
  if (!withoutJsdom) {
    domCleanIt(props);
  }
};

/**
 * Wrap state updates in `act(...)` so React flushes them before assertions.
 *
 * Supports sync and async callbacks, optional delay to let timers/microtasks
 * settle, and the no-argument form (`act()`). The callback may also be passed
 * as the only argument; `milliseconds`/`debug` may be given positionally or
 * via an options object as the second argument.
 *
 * @param {function} [cb]
 * @param {number|{milliseconds?: number, ms?: number, debug?: boolean}} [milliseconds]
 * @param {boolean} [debug]
 */
const act = async (cb = () => {}, milliseconds = 1, debug = false) => {
  // Allow `act(cb, { ms, debug })` form.
  if (milliseconds && typeof milliseconds === "object") {
    const opts = /** @type {any} */ (milliseconds);
    milliseconds = opts.milliseconds ?? opts.ms ?? 1;
    debug = opts.debug ?? debug;
  }
  if (typeof cb !== "function") {
    cb = () => {};
  }
  const ms = Number.isFinite(milliseconds) ? milliseconds : 1;
  const start = getTimestamp();
  await rtlAct(async () => {
    const result = cb();
    if (result && typeof result.then === "function") {
      await result;
    }
    if (ms > 0) {
      await new Promise((resolve) => {
        const tick = () => {
          const now = getTimestamp();
          if (debug) {
            console.log({ during: now - start, debug, start, now });
          }
          if (start + ms <= now) {
            resolve();
          } else {
            setTimeout(tick, 1);
          }
        };
        tick();
      });
    } else {
      // Flush at least one microtask so pending state updates settle.
      await Promise.resolve();
      await Promise.resolve();
    }
    // Let any remaining microtasks (state updates) flush before act resolves.
    await Promise.resolve();
    await Promise.resolve();
  });
};

/**
 * @typedef {Object} RenderResult
 * @property {function} html
 * @property {function} instance
 */

/**
 * @typedef {import("@testing-library/react").RenderOptions & {
 *   instance?: boolean|((el: React.ReactElement) => void),
 * }} CustomRenderOptions
 */

/**
 * rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
 *
 * @param {React.ReactElement} OrigDom
 * @param {CustomRenderOptions} [options]
 * @returns {import("@testing-library/react").RenderResult & RenderResult}
 */
const render = (OrigDom, options = {}) => {
  let instance = options?.instance;
  let Dom = OrigDom;
  /** @type {any} */
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
  hideConsoleWarn,
};
