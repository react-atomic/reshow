import jsdomGlobal from "jsdom-global";
import {
  shallow as enzymeShallow,
  mount as enzymeMount,
  configure,
} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const mountWrapper = { current: null };
const mountOption = { current: null };
const shallowWrapper = { current: null };
const jsdomWrapper = { current: null };

const clean = (wrapper, keepOption) => {
  if (wrapper.current) {
    if (keepOption && keepOption.current) {
      if (keepOption.current.attachTo || keepOption.current.hydrateIn) {
        wrapper.current.detach();
      }
      keepOption.current = null;
    }
    wrapper.current.unmount();
  }
  wrapper.current = null;
};

// https://github.com/enzymejs/enzyme/blob/master/docs/api/mount.md
const thisMount = (wrapper, keepOption) => (node, options) => {
  clean(wrapper, keepOption);
  keepOption.current = options;
  wrapper.current = enzymeMount(node, options);
  const enzymeUnmount = wrapper.current.unmount;
  wrapper.current.unmount = () => {
    enzymeUnmount.call(wrapper.current);
    wrapper.current = null;
  };
  return wrapper.current;
};

// https://github.com/enzymejs/enzyme/blob/master/docs/api/shallow.md
const thisShallow = (wrapper) => (node, options) => {
  clean(wrapper);
  wrapper.current = enzymeShallow(node, options);
  return wrapper.current;
};

const mount = thisMount(mountWrapper, mountOption);
const shallow = thisShallow(shallowWrapper);
const jsdom = (html, options) => {
  if (jsdomWrapper.current) {
    jsdomWrapper.current();
  }
  jsdomWrapper.current = jsdomGlobal(html, options);
  return jsdomWrapper.current;
};

const cleanIt = (props) => {
  const { withoutJsdom } = props || {};
  clean(mountWrapper, mountOption);
  clean(shallowWrapper);
  if (!withoutJsdom && jsdomWrapper.current) {
    jsdomWrapper.current();
    jsdomWrapper.current = jsdomGlobal();
  }
};

export { shallow, mount, cleanIt, jsdom };
