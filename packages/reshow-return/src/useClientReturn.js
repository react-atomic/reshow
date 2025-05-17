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
 * @template StateType
 * @template ActionType
 *
 * @type {UseClientReturnType<StateType, ActionType>}
 */
const useClientReturn = (p1, p2, p3) => {
  if (hydrate() || p3?.isHydrate) {
    const p2Any = /**@type any*/ (p2);
    const state = useReturn(p1, p2Any, p3);
    const isLoad = useLoaded();
    return /**@type StateType*/ (isLoad ? state : {});
  } else {
    const p2Any = /**@type any*/ (p2);
    const anyState = /**@type any*/ (useReturn(p1, p2Any, p3));
    return /**@type StateType*/ (anyState);
  }
};

export default useClientReturn;
