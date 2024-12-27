// @ts-check
import { createReducer } from "reshow-flux-base";
import { localStorage, sessionStorage, Storage } from "get-storage";

const lastDispatch = { current: {} };

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("reshow-flux-base").ReducerStoreAndDispatch<StateType, ActionType>} ReducerStoreAndDispatch
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("reshow-flux-base").ReducerType<StateType, ActionType>} ReducerType
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("reshow-flux-base").DispatchFunction<StateType, ActionType>} DispatchFunction
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("reshow-flux-base").StoreObject<StateType, ActionType>} StoreObject
 */

/**
 * @param {string} name
 * @param {Function} storage
 * @param {boolean=} disableEncode
 * @returns {ReducerStoreAndDispatch<Storage, any>}
 */
const getLocalReducer = (name, storage, disableEncode) => {
  return createReducer(
    /**
     * @type {ReducerType<Storage, any>}
     */
    (state, action) => {
      lastDispatch.current = {
        name,
        action,
      };
      const result = /**@type {Storage}*/ (state.merge(action));
      return result;
    },
    new Storage(storage, disableEncode),
  );
};

const LOCAL_STORAGE = "localStorage";
const LOCAL_VALUE = "localValue";
const SESSION_STORAGE = "sessionStorage";
const SESSION_VALUE = "sessionValue";

/**
 * @type {[StoreObject<Storage, any>, DispatchFunction<Storage, any>]}
 */
const [localStorageStore, localStorageDispatch] = getLocalReducer(
  LOCAL_STORAGE,
  localStorage,
);
/**
 * @type {[StoreObject<Storage, any>, DispatchFunction<Storage, any>]}
 */
const [localValueStore, localValueDispatch] = getLocalReducer(
  LOCAL_VALUE,
  localStorage,
  true,
);
/**
 * @type {[StoreObject<Storage, any>, DispatchFunction<Storage, any>]}
 */
const [sessionStorageStore, sessionStorageDispatch] = getLocalReducer(
  SESSION_STORAGE,
  sessionStorage,
);
/**
 * @type {[StoreObject<Storage, any>, DispatchFunction<Storage, any>]}
 */
const [sessionValueStore, sessionValueDispatch] = getLocalReducer(
  SESSION_VALUE,
  sessionStorage,
  true,
);

export {
  localStorageStore,
  localStorageDispatch,
  localValueStore,
  localValueDispatch,
  sessionStorageStore,
  sessionStorageDispatch,
  sessionValueStore,
  sessionValueDispatch,
};
