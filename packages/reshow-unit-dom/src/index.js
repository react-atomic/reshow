import jsdomGlobal from "global-jsdom";
import sinon from "sinon";

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

const hideConsoleError = () => {
  if (!consoleWrapper.current) {
    consoleWrapper.current = console.error;
    console.error = () => {};
  }
};

const getSinon = () => {
  if (sinonWrapper.current) {
    sinonWrapper.current.restore();
  }
  sinonWrapper.current = sinon.createSandbox();
  return sinonWrapper.current;
};

const cleanIt = (props) => {
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
};

export { cleanIt, jsdom, hideConsoleError, getSinon };
