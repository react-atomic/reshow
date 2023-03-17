// @ts-check

import callfunc from "call-func";

/**
 * @param {object} props
 */
const storeLocator = (props) => props?.store;

/**
 * @returns {object}
 */
const getStore = ({ props, options }) => {
  const allProps = { ...options, ...props };
  const store = callfunc(options?.storeLocator || storeLocator, [allProps]);
  if (!store) {
    console.trace();
    throw "Need defined store. such as store={your-store}";
  }
  allProps.store = store;
  return allProps;
};

export default getStore;
