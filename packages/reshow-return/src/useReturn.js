// @ts-check
import { useConnect } from "reshow-flux";
import connectOptions from "./connectOptions";

/**
 * @typedef {object} UseReturnPayLoad
 * @param {{[key: string]: string[]}} [pathStates]
 * @param {boolean} [immutable]
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
  { pathStates, immutable = true } = {}
) => {
  const state = useConnect(connectOptions)({
    store,
    initStates,
    pathStates,
    immutable,
  });
  return state;
};

export default useReturn;
