// @ts-check
import { useLoaded } from "reshow-hooks";
import useReturn from "./useReturn";
import hydrate from "./hydrate";

/**
 * @type {import('./useReturn').UseReturnType}
 */
const useClientReturn = (...p) => {
  if (hydrate() || p[2]?.isHydrate) {
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
