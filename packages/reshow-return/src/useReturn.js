// @ts-check
import { useConnect } from "reshow-flux";
import connectOptions from "./connectOptions";

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("./connectOptions").calculateOptions<StateType, ActionType>} calculateOptions
 */

/**
 * @typedef {object} UseReturnPayLoad
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {boolean} [immutable]
 * @property {boolean} [renewProps]
 * @property {function({prev:any, nextProps:any, nextState:any}):boolean} [shouldComponentUpdate]
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback UseReturnType
 * @param {import('./connectOptions').InitStatesType?} initStates
 * @param {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @param {UseReturnPayLoad} [payload]
 *
 * @returns {StateType}
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @type UseReturnType<StateType, ActionType>
 */
const useReturn = (
  initStates,
  store,
  { pathStates, renewProps, shouldComponentUpdate, immutable = true } = {}
) => {
  /**
   * @type {calculateOptions<StateType, ActionType>&UseReturnPayLoad}
   */
  const options = {
    initStates,
    store,
    pathStates,
    immutable,
    renewProps,
    shouldComponentUpdate,
  };

  const state = useConnect(connectOptions)(options);
  return /**@type StateType*/ (state);
};

export default useReturn;
