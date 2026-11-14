// @ts-check
import jsdomGlobal from "global-jsdom";
import sinon from "sinon";
import { FUNCTION } from "reshow-constant";

/**
 * @template T
 * @typedef {object} CallableWrapper
 * @property {T|null} [current]
 */

/**
 * @type {CallableWrapper<() => void>}
 */
const jsdomWrapper = { current: null };
/**
 * @type {CallableWrapper<typeof console.error>}
 */
const consoleErrorWrapper = { current: null };
/**
 * @type {CallableWrapper<typeof console.error>}
 */
const consoleWarnWrapper = { current: null };
/**
 * @type {CallableWrapper<SinonSandbox>}
 */
const sinonWrapper = { current: null };

/**
 * @param {string=} html
 * @param {any} [options]
 */
const jsdom = (html, options) => {
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
  }
  jsdomWrapper.current = jsdomGlobal(html, options);
  return jsdomWrapper.current;
};

/**
 * @param {boolean|Function} [toThrow]
 */
const hideConsoleError = (toThrow) => {
  if (!consoleErrorWrapper.current) {
    consoleErrorWrapper.current = console.error;
    console.error = () => {};
  }
  if (true === toThrow) {
    console.error = (/** @type any*/ p) => {
      throw p;
    };
  } else if (FUNCTION === typeof toThrow) {
    console.error = /** @type any*/ (toThrow);
  }
};

/**
 * @param {boolean|Function} [toThrow]
 */
const hideConsoleWarn = (toThrow) => {
  if (!consoleWarnWrapper.current) {
    consoleWarnWrapper.current = console.error;
    console.error = () => {};
  }
  if (true === toThrow) {
    console.error = (/** @type any*/ p) => {
      throw p;
    };
  } else if (FUNCTION === typeof toThrow) {
    console.error = /** @type any*/ (toThrow);
  }
};

/**
 * @typedef {import("sinon").SinonSandbox} SinonSandbox
 */

/**
 * @see https://sinonjs.org/releases/latest/sandbox/
 * @param {any} [options]
 * @returns {SinonSandbox}
 */
const getSinon = (options) => {
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
    sinonWrapper.current = null;
  }
  sinonWrapper.current = sinon.createSandbox(options);
  return /**@type {SinonSandbox}*/ (sinonWrapper.current);
};

/**
 * @typedef {object} CleanItProps
 * @property {any} [debug]
 */

/**
 * @param {CleanItProps} [props]
 */
const cleanIt = (props) => {
  const { debug } = props || {};
  if (consoleErrorWrapper.current) {
    // Need locate before jsdom
    console.error = consoleErrorWrapper.current;
    consoleErrorWrapper.current = null;
  }
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
    jsdomWrapper.current = jsdomGlobal();
  }
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
    sinonWrapper.current = null;
  }
  if (debug) {
    console.log({ debug });
  }
};

/**
 * @param {function} cb
 * @param {number} delay
 * @returns {Promise<null>}
 */
const sleep = (cb, delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      cb && cb();
      resolve(null);
    }, delay);
  });

export { cleanIt, jsdom, hideConsoleError, hideConsoleWarn, getSinon, sleep };
