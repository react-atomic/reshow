import jsdomGlobal from "jsdom-global";
const jsdomWrapper = { current: null };

const jsdom = (html, options) => {
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
  }
  jsdomWrapper.current = jsdomGlobal(html, options);
  return jsdomWrapper.current;
};

const cleanIt = (props) => {
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
    jsdomWrapper.current = jsdomGlobal();
  }
};

export { cleanIt, jsdom };
