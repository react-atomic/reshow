import {
  shallow as enzymeShallow,
  mount as enzymeMount,
  configure,
} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

let mountWrapper;
let mountOption;
let shallowWrapper;

const clean = (wrapper, keepOption) => {
  if (wrapper) {
    wrapper.unmount();
  }
  if (keepOption) {
    if (keepOption.attachTo || keepOption.hydrateIn) {
      wrapper.detach();
    }
  }
  wrapper = null;
  keepOption = null;
};

// https://github.com/enzymejs/enzyme/blob/master/docs/api/mount.md
const thisMount = (wrapper, keepOption) => (node, options) => {
  clean(wrapper, keepOption);
  keepOption = options;
  wrapper = enzymeMount(node, options);
  return wrapper;
};

const mount = thisMount(mountWrapper, mountOption);

// https://github.com/enzymejs/enzyme/blob/master/docs/api/shallow.md
const thisShallow = (wrapper) => (node, options) => {
  clean(wrapper);
  wrapper = enzymeShallow(node, options);
  return wrapper;
};

const shallow = thisShallow(shallowWrapper);

const cleanIt = () => {
  clean(mountWrapper, mountOption);
  clean(shallowWrapper);
};

export { shallow, mount, cleanIt };
