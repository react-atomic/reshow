//@ts-check

import get from "get-object-value";
import { toJS } from "reshow-flux";
import { IS_ARRAY, KEYS, T_UNDEFINED } from "reshow-constant";
import { StoreObject } from "reshow-flux-base";

/**
 * @param {object} props
 * @param {object} [more]
 * @returns {object}
 */
const reset = (props, more) => {
  const cleanKeys = [
    "excludeStates",
    "immutable",
    "initStates",
    "pathStates",
    "renewProps",
    "store",
    "storeLocator",
    "shouldComponentUpdate",
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
 * @typedef {Record<string, string>} InitStateObject
 */

/**
 * @typedef {Record<string, any>} StateObject
 */

/**
 * @typedef { string[] | InitStateObject } InitStatesType
 */

/**
 * @param {InitStatesType} initStates
 * @returns {[initStates extends string[] ? initStates : (keyof InitStateObject)[], function(string):string]}
 */
export const stateKeyLocator = (initStates) => {
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
 * @param {boolean} immutable
 * @returns {function(any):any}
 */
const getImmutable = (immutable) => (data) => !immutable ? toJS(data) : data;

/**
 * @typedef {Object<string, string[]>} PathStates
 */

/**
 * @typedef {object} calculateOptions
 * @property {InitStatesType} initStates
 * @property {StoreObject} store
 * @property {PathStates=} pathStates
 * @property {string[]=} excludeStates
 * @property {boolean=} immutable
 */

/**
 * @param {StateObject} prevState
 * @param {calculateOptions} calculateOptions
 * @returns {StateObject}
 */
const calculateState = (prevState, calculateOptions) => {
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
  } = calculateOptions;

  const getStateValue = stateValueGetter(store.getState());

  const immutable = optImmutable ?? getStateValue("immutable");
  const toImmutable = getImmutable(immutable);
  const [stateKeys, toNewKey] = stateKeyLocator(initStates);

  const results = {};
  stateKeys.forEach(
    /**
     * @param {string} key
     */
    (key) => {
      const data = getStateValue(key);
      results[toNewKey(key)] = toImmutable(data);
    }
  );
  if (pathStates) {
    KEYS(pathStates || {}).forEach(
      (key) => (results[key] = get(results, pathStates[key]))
    );
  }

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

export default {
  calculateState,
  reset,
};
