import get from "get-object-value";
import callfunc from "call-func";
import { getStores } from "reshow-flux";

import toJS from "./toJS";

const keys = Object.keys;
const isArray = Array.isArray;
const getImmutable = (immutable) => (data) => (!immutable ? toJS(data) : data);
const getMapIn = (map, path) =>
  map && map.getIn ? map.getIn(path) : undefined;
const reset = (props, more) => {
  const nextProps = {...props};
  [
    "immutable",
    "initStates",
    "pathStates",
    "stores",
    "storeLocator",
    ...(more || []),
  ].forEach((key) => delete nextProps[key]);
  return nextProps;
};



const calculateState = (prevState, props) => {
  /**
   * Why not support multi stores?
   * Because multi stores need handle complex data merge.
   * If that case need create custom calculateState functoin.
   */
  const thisStore = (getStores(props) || [])[0];
  if (!thisStore) {
    throw "Store not found, Please check storeLocator function.";
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
  calculateState,
  reset,
};

export default options;
