import jsdomGlobal from "jsdom-global";

const jsdomWrapper = { current: null };
const consoleWrapper = { current: null };

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

const cleanIt = (props) => {
  if (consoleWrapper.current) {
    // Need locate before jsdom
    console.error = consoleWrapper.current;
  }
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
    jsdomWrapper.current = jsdomGlobal();
  }
};

export { cleanIt, jsdom, hideConsoleError };
