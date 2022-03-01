import get from "get-object-value";
import callfunc from "call-func";
import { toJS } from "reshow-flux";
import { IS_ARRAY, KEYS } from "reshow-constant";

const getImmutable = (immutable) => (data) => !immutable ? toJS(data) : data;
const getMapIn = (map, path) =>
  map && map.getIn ? map.getIn(path) : undefined;

const reset = (props, more) => {
  const nextProps = { ...props };
  const cleanKeys = [
    "changeable",
    "immutable",
    "initStates",
    "pathStates",
    "store",
    "storeLocator",
    ...(more || []),
  ];
  let i = cleanKeys.length;
  while (i--) {
    delete nextProps[cleanKeys[i]];
  }
  return nextProps;
};

const stateValueGetter = (state) => (k) =>
  state.get ? state.get(k) : get(state, [k]);

const stateKeyLocator = (initStates) => {
  let keys;
  let getNewKey;
  if (IS_ARRAY(initStates)) {
    keys = initStates;
    getNewKey = (key) => key;
  } else {
    keys = initStates ? KEYS(initStates) : [];
    getNewKey = (key) => (null != initStates[key] ? initStates[key] : key);
  }
  return [keys, getNewKey];
};

const calculateState = (prevState, options) => {
  /**
   * Why not support multi stores?
   * Because multi stores need handle complex data merge.
   * If that case need create custom calculateState functoin.
   */
  const { initStates, pathStates, immutable: optImmutable, store } = options;

  const getStateValue = stateValueGetter(store.getState());

  const immutable = optImmutable ?? getStateValue("immutable");
  const results = {};
  if (immutable) {
    results.immutable = immutable;
  }

  const toImmutable = getImmutable(immutable);

  const [stateKeys, newKey] = stateKeyLocator(initStates);
  stateKeys.forEach((key) => {
    const data = getStateValue(key);
    results[newKey(key)] = toImmutable(data);
  });

  KEYS(pathStates || {}).forEach((key) => {
    const thisPath = pathStates[key];
    results[key] = immutable
      ? getMapIn(results[thisPath[0]], thisPath.slice(1))
      : get(results, thisPath);
  });

  const resultKeys = KEYS(results);
  let bSame = true;
  let i = resultKeys.length;
  while (i--) {
    const key = resultKeys[i];
    if (results[key] !== prevState[key]) {
      bSame = false;
      break;
    }
  }

  return bSame ? prevState : results;
};

const connectOptions = {
  calculateState,
  reset,
};

export default connectOptions;

export { stateKeyLocator };
