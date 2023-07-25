// @ts-check
import { useLoaded } from "reshow-hooks";
import { hasWin, win } from "win-doc";
import useReturn from "./useReturn";

/**
 * @type {import('./useReturn').UseReturnType}
 */
const useClientReturn = (...p) => {
  const hydrate = /** @type {any}*/(win()).Reshow?.hydrate;
  if (hydrate || !hasWin()) {
    const state = useReturn(...p);
    const isLoad = useLoaded();
    if (isLoad) {
      return state;
    } else {
      return {};
    }
  } else {
    return useReturn(...p);
  }
};

export default useClientReturn;
