// @ts-check
import { useLoaded } from "reshow-hooks";
import useReturn from "./useReturn";
import hydrate from "./hydrate";

/**
 * @typedef {import('./useReturn').UseReturnPayLoad} UseReturnPayLoad
 */

/**
 * @typedef {object&UseReturnPayLoad} UseClientReturnPayLoad
 * @property {boolean} [isHydrate]
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @callback UseClientReturnType
 * @param {import('./connectOptions').InitStatesType?} initStates
 * @param {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @param {UseClientReturnPayLoad} [payload]
 *
 * @returns {StateType}
 *
 */

/**
 * @type {UseClientReturnType<any, any>}
 */
const useClientReturn = (initStates, store, payload) => {
  const { isHydrate, ...restpayload } = payload || {};
  if (hydrate() || isHydrate) {
    const state = useReturn(initStates, store, restpayload);
    const isLoad = useLoaded();
    return isLoad ? state : {};
  } else {
    return useReturn(initStates, store, restpayload);
  }
};

export default useClientReturn;
