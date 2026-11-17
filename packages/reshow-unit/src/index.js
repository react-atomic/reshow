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
import build from "reshow-build";
import { StrictMode, act as rtlAct } from "react";

const envStrictMode = /** @type string*/ (process.env.STRICT_MODE);
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
 * @param {() => (void | PromiseLike<void>)} [cb]
 * @param {number | {milliseconds?: number, ms?: number, debug?: boolean}} [milliseconds]
 * @param {boolean} [debug]
 */
const act = async (cb = () => {}, milliseconds, debug = false) => {
  const msExplicitArg = milliseconds !== undefined;
  const rawMs = milliseconds;

  // milliseconds is "explicit" when the caller passed something for it
  // (detected via the undefined check below, not arguments.length): a
  // positional number or an options object carrying ms/milliseconds, as
  // opposed to relying on the default.
  let msExplicit = msExplicitArg;
  /** @type {number | undefined} */
  let msValue;
  if (rawMs && typeof rawMs === "object") {
    const opts = /** @type {{milliseconds?: number, ms?: number, debug?: boolean}} */ (rawMs);
    if (Object.prototype.hasOwnProperty.call(opts, "milliseconds") || Object.prototype.hasOwnProperty.call(opts, "ms")) {
      msExplicit = true;
      msValue = opts.milliseconds ?? opts.ms;
    }
    debug = typeof opts.debug === "boolean" ? opts.debug : debug;
  } else if (msExplicitArg) {
    msExplicit = true;
    msValue = typeof rawMs === "number" ? rawMs : undefined;
  }

  if (typeof cb !== "function") {
    cb = () => {};
  }

  const start = getTimestamp();
  await rtlAct(async () => {
    const result = /** @type {() => (void | PromiseLike<void>)} */ (cb)();
    const isThenable =
      !!result &&
      (typeof result === "object" || typeof result === "function") &&
      typeof /** @type {{then?: () => void}} */ (result).then === "function";
    let ms;
    if (msExplicit) {
      // Explicit ms is a min-wait measured from act() start (before cb runs);
      // it does not extend past the callback's promise.
      ms =
        typeof msValue === "number" && Number.isFinite(msValue) ? msValue : 1;
    } else {
      // Defaults: async callback flushes microtasks only (0); sync callback
      // keeps the fixed-milliseconds wait (1).
      ms = isThenable ? 0 : 1;
    }
    if (isThenable) {
      // React act semantics: fully await the callback's promise.
      await /** @type {PromiseLike<void>} */ (result);
    }
    if (ms > 0) {
      // Sleep only the remaining wall-clock time since act() started, so a
      // callback that already took longer than ms does not wait twice.
      const remaining = ms - (getTimestamp() - start);
      if (remaining > 0) {
        await sleep(() => {
          if (debug) {
            const now = getTimestamp();
            console.log({ during: now - start, debug, start, now });
          }
        }, remaining);
      }
    } else {
      await Promise.resolve();
    }
    // Let any remaining microtasks (state updates) flush before act resolves.
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
