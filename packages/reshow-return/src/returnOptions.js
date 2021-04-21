import get from "get-object-value";
import callfunc from "call-func";

import toJS from "./toJS";

const keys = Object.keys;
const isArray = Array.isArray;
const getImmutable = (immutable) => (data) => (!immutable ? toJS(data) : data);
const storeLocator = (props) => props?.stores;
const getMapIn = (map, path) =>
  map && map.getIn ? map.getIn(path) : undefined;
const reset = (props, more) => {
  [
    "immutable",
    "initStates",
    "pathStates",
    "stores",
    "storeLocator",
    ...(more || []),
  ].forEach((key) => delete props[key]);
  return props;
};

const defaultProps = {
  initStates: [],
  pathStates: {},
  immutable: false,
  storeLocator,
};

const getStores = (props) =>
  callfunc(props?.storeLocator || storeLocator, [props]);

const calculateState = (prevState, props, stores) => {
  /**
   * Why not support multi stores?
   * Because multi stores need handle complex data merge.
   * If that case need create custom calculateState functoin.
   */
  const thisStore = (stores || [])[0];
  if (!thisStore) {
    throw new Error("Store not found, Please check getStores function.");
  }
  const { initStates, pathStates, immutable: propsImmutable } = props;
  const storeState = thisStore.getState();
  const immutable = propsImmutable || storeState.get("immutable");
  const results = {};
  if (immutable) {
    results.immutable = immutable;
  }

  const toImmutable = getImmutable(immutable);

  if (isArray(initStates)) {
    initStates.forEach((key) => {
      const data = storeState.get(key);
      results[key] = toImmutable(data);
    });
  } else if (initStates) {
    keys(initStates).forEach((key) => {
      const data = storeState.get(key);
      const newKey = null != initStates[key] ? initStates[key] : key;
      results[newKey] = toImmutable(data);
    });
  }

  keys(pathStates || {}).forEach((key) => {
    const thisPath = pathStates[key];
    results[key] = immutable
      ? getMapIn(results[thisPath[0]], thisPath.slice(1))
      : get(results, thisPath);
  });
  return results;
};

const options = {
  defaultProps,
  getStores,
  calculateState,
  reset,
};

export default options;
