import jsdomGlobal from "global-jsdom";
import sinon from "sinon";
import { FUNCTION } from "reshow-constant";

const jsdomWrapper = { current: null };
const consoleWrapper = { current: null };
const sinonWrapper = { current: null };

const jsdom = (html, options) => {
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
  }
  jsdomWrapper.current = jsdomGlobal(html, options);
  return jsdomWrapper.current;
};

const hideConsoleError = (toThrow) => {
  if (!consoleWrapper.current) {
    consoleWrapper.current = console.error;
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

/**
 * @see https://sinonjs.org/releases/latest/sandbox/
 */
const getSinon = (options) => {
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
  }
  sinonWrapper.current = sinon.createSandbox(options);
  return sinonWrapper.current;
};

const cleanIt = ({ debug } = {}) => {
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

export { cleanIt, jsdom, hideConsoleError, getSinon };
