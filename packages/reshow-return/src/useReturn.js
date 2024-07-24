// @ts-check
import { useConnect } from "reshow-flux";
import connectOptions from "./connectOptions";

/**
 * @typedef {object} UseReturnPayLoad
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {boolean} [isHydrate]
 * @property {string[]} [excludeStates]
 * @property {boolean} [immutable]
 * @property {boolean} [renewProps]
 * @property {function({prev:any, nextProps:any, nextState:any}):boolean} [shouldComponentUpdate]
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback UseReturnType
 * @param {import('./connectOptions').InitStatesType} initStates
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
  {
    pathStates,
    excludeStates,
    renewProps,
    shouldComponentUpdate,
    immutable = true,
  } = {},
) => {
  const state = useConnect(connectOptions)({
    store,
    initStates,
    pathStates,
    excludeStates,
    renewProps,
    shouldComponentUpdate,
    immutable,
  });
  return /**@type StateType*/ (state);
};

export default useReturn;
