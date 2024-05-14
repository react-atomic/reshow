// @ts-check
import { useLoaded } from "reshow-hooks";
import useReturn from "./useReturn";
import hydrate from "./hydrate";

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import('./useReturn').UseReturnType<StateType, ActionType>} UseReturnType
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @type {UseReturnType<StateType, ActionType>}
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
