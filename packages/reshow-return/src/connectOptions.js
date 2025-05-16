//@ts-check

import get from "get-object-value";
import { toJS } from "reshow-flux";
import { IS_ARRAY, KEYS, T_UNDEFINED } from "reshow-constant";

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
  (k) =>
    get(state, [k]);

/**
 * @typedef {Record<string, string>} InitStateObject
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
    const nextStates = null == initStates ? {} : initStates;
    keys = KEYS(nextStates);
    getNewKey = (/** @type any*/ key) =>
      null != nextStates[key] ? nextStates[key] : key;
  }
  return [keys, getNewKey];
};

/**
 * @param {boolean} immutable
 * @returns {function(any):any}
 */
const getImmutable = (immutable) => (data) => (!immutable ? toJS(data) : data);

/**
 * @typedef {Object<string, string[]>} PathStates
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} calculateOptions
 * @property {InitStatesType} initStates
 * @property {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @property {PathStates=} pathStates
 * @property {boolean=} immutable
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @param {StateType} prevState
 * @param {calculateOptions<StateType, ActionType>} calculateOptions
 * @returns {StateType}
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
    immutable: optImmutable,
    store,
  } = calculateOptions;

  const getStateValue = stateValueGetter(store.getState());

  const immutable = optImmutable ?? getStateValue("immutable");
  const toImmutable = getImmutable(immutable);
  const [stateKeys, toNewKey] = stateKeyLocator(initStates);

  const extracData = (/**@type any[]*/ arrKey) => {
    const results = {};
    arrKey.forEach(
      /**
       * @param {string} key
       */
      (key) => {
        const data = getStateValue(key);
        results[toNewKey(key)] = toImmutable(data);
      }
    );
    return results;
  };

  // Test pathStates all first key exists in stateKeys
  const additionalKeys = [];
  let results;
  if (pathStates) {
    const pathKeys = KEYS(pathStates);
    pathKeys.forEach((pathKey) => {
      const firstKey = pathStates[pathKey][0];
      if (-1 === stateKeys.indexOf(firstKey)) {
        if (firstKey !== pathKey) {
          additionalKeys.push(firstKey);
        }
        stateKeys.push(firstKey);
      }
    });
    results = extracData(stateKeys);
    pathKeys.forEach((key) => (results[key] = get(results, pathStates[key])));
    let i = additionalKeys.length;
    while (i--) {
      delete results[additionalKeys[i]];
    }
  } else {
    results = extracData(stateKeys);
  }
  let bSame = true;
  const resultKeys = KEYS(results);
  let i = resultKeys.length;
  while (i--) {
    const key = resultKeys[i];
    if (results[key] !== prevState[key]) {
      bSame = false;
      break;
    }
  }

  return /**@type StateType*/ (bSame ? prevState : results);
};

export default {
  calculateState,
  reset,
};
