//@ts-check

import get from "get-object-value";
import { toJS } from "reshow-flux";
import { IS_ARRAY, KEYS, T_UNDEFINED } from "reshow-constant";

const getImmutable =
  (/** @type boolean */ immutable) => (/** @type any */ data) =>
    !immutable ? toJS(data) : data;

/**
 * @typedef {any[]|object} InitStatesProps
 */

/**
 * @param {object} props
 * @param {object} [more]
 * @returns {object}
 */
const reset = (props, more) => {
  const cleanKeys = [
    "immutable",
    "initStates",
    "pathStates",
    "excludeStates",
    "renewProps",
    "store",
    "storeLocator",
    ...(more || []),
  ];
  let i = cleanKeys.length;

  /**
   * Why use undefined?
   * https://github.com/react-atomic/reshow/issues/117
   *
   * Why could use undefined?
   * because reshow-build have remove empty to clean undefined.
   * if u use react directly, react will complain error.
   *
   */
  while (i--) {
    const key = cleanKeys[i];
    props[key] && (props[key] = T_UNDEFINED);
  }
  return props;
};

/**
 * @param {any} state
 */
const stateValueGetter =
  (state) =>
  /**
   * @param {any} k
   * @returns {any}
   */
  (k) => {
    if (null != state) {
      return state.get ? state.get(k) : get(state, [k]);
    }
  };

/**
 * @param {InitStatesProps} initStates
 * @returns {[any[], function(string):any]}
 */
const stateKeyLocator = (initStates) => {
  let keys;
  let getNewKey;
  if (IS_ARRAY(initStates)) {
    keys = initStates;
    getNewKey = (/** @type any*/ key) => key;
  } else {
    keys = initStates ? KEYS(initStates) : [];
    getNewKey = (/** @type any*/ key) =>
      null != initStates[key] ? initStates[key] : key;
  }
  return [keys, getNewKey];
};

/**
 * @param {object} prevState
 * @param {object} options
 * @returns {object}
 */
const calculateState = (prevState, options) => {
  /**
   * Why not support multi stores?
   * Because multi stores need handle complex data merge.
   * If that case need create custom calculateState functoin.
   */
  const {
    initStates,
    pathStates,
    excludeStates = [],
    immutable: optImmutable,
    store,
  } = options;

  const getStateValue = stateValueGetter(store.getState());

  const immutable = optImmutable ?? getStateValue("immutable");
  const toImmutable = getImmutable(immutable);
  const [stateKeys, newKey] = stateKeyLocator(initStates);

  const results = {};
  stateKeys.forEach((key) => {
    const data = getStateValue(key);
    results[newKey(key)] = toImmutable(data);
  });
  KEYS(pathStates || {}).forEach(
    (key) => (results[key] = get(results, pathStates[key]))
  );

  const resultKeys = KEYS(results);
  let bSame = true;
  let i = excludeStates.length;
  while (i--) {
    delete results[excludeStates[i]];
  }
  i = resultKeys.length;
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
