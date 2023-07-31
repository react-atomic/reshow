// @ts-check
import { useConnect } from "reshow-flux";
import connectOptions from "./connectOptions";

/**
 * @typedef {object} UseReturnPayLoad
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {string[]} [excludeStates]
 * @property {boolean} [immutable]
 */

/**
 * @callback UseReturnType
 * @param {import('./connectOptions').InitStatesProps} initStates
 * @param {import("reshow-flux-base").StoreObject} store
 * @param {UseReturnPayLoad} [payload]
 */

/**
 * @type UseReturnType
 */
const useReturn = (
  initStates,
  store,
  { pathStates, excludeStates, immutable = true } = {}
) => {
  const state = useConnect(connectOptions)({
    store,
    initStates,
    pathStates,
    excludeStates,
    immutable,
  });
  return state;
};

export default useReturn;
