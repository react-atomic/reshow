// @ts-check

import callfunc from "call-func";

/**
 * @template StateType
 * @template ActionType
 * @typedef {import("reshow-flux-base").StoreObject<StateType, ActionType>} StoreObject
 */

/**
 * @template StateType
 * @template ActionType
 * @param {object} props
 * @returns{StoreObject<StateType, ActionType>}
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
