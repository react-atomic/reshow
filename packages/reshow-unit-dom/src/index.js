// @ts-check
import jsdomGlobal from "global-jsdom";
import sinon from "sinon";
import { FUNCTION } from "reshow-constant";

/**
 * @typedef {object} CallableWrapper
 * @param {Function} [current]
 */

/**
 * @type CallableWrapper
 */
const jsdomWrapper = { current: null };
/**
 * @type CallableWrapper
 */
const consoleWrapper = { current: null };
/**
 * @type CallableWrapper
 */
const sinonWrapper = { current: null };

/**
 * @param {string} html
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
  if (!consoleWrapper.current) {
    consoleWrapper.current = console.error;
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
 * @see https://sinonjs.org/releases/latest/sandbox/
 * @param {any} [options]
 */
const getSinon = (options) => {
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
    sinonWrapper.current = null;
  }
  sinonWrapper.current = sinon.createSandbox(options);
  return sinonWrapper.current;
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
  if (consoleWrapper.current) {
    // Need locate before jsdom
    console.error = consoleWrapper.current;
    consoleWrapper.current = null;
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
 * @returns {Promise}
 */
const sleep = (cb, delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      cb && cb();
      resolve(null);
    }, delay);
  });

export { cleanIt, jsdom, hideConsoleError, getSinon, sleep };
