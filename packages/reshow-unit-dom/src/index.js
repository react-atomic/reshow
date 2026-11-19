// @ts-nocheck
import { jsdom, jsdomWrapper } from "./setup-dom.js";
import sinon from "sinon";
import { FUNCTION } from "reshow-constant";

const consoleErrorWrapper = { current: null };
const consoleWarnWrapper = { current: null };
const sinonWrapper = { current: null };

const hideConsoleError = (toThrow) => {
  if (!consoleErrorWrapper.current) {
    consoleErrorWrapper.current = console.error;
    console.error = () => {};
  }
  if (true === toThrow) {
    console.error = (p) => {
      throw p;
    };
  } else if (FUNCTION === typeof toThrow) {
    console.error = toThrow;
  }
};

const hideConsoleWarn = (toThrow) => {
  if (!consoleWarnWrapper.current) {
    consoleWarnWrapper.current = console.warn;
    console.warn = () => {};
  }
  if (true === toThrow) {
    console.warn = (p) => {
      throw p;
    };
  } else if (FUNCTION === typeof toThrow) {
    console.warn = toThrow;
  }
};

const getSinon = (options) => {
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
    sinonWrapper.current = null;
  }
  sinonWrapper.current = sinon.createSandbox(options);
  return sinonWrapper.current;
};

const cleanIt = (props) => {
  const { debug } = props || {};
  if (consoleErrorWrapper.current) {
    console.error = consoleErrorWrapper.current;
    consoleErrorWrapper.current = null;
  }
  if (consoleWarnWrapper.current) {
    console.warn = consoleWarnWrapper.current;
    consoleWarnWrapper.current = null;
  }
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
    jsdomWrapper.current = jsdom();
  }
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
    sinonWrapper.current = null;
  }
  if (debug) {
    console.log({ debug });
  }
};

const sleep = (cb, delay) =>
  new Promise((resolve) => {
    setTimeout(() => {
      cb && cb();
      resolve(null);
    }, delay);
  });

export { cleanIt, jsdom, hideConsoleError, hideConsoleWarn, getSinon, sleep };
