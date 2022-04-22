import { useConnect } from "reshow-flux";
import { useLoaded } from "reshow-hooks";
import connectOptions from "./connectOptions";
import { hasWin, win } from "win-doc";
import useReturn from "./useReturn";

const useClientReturn = (...p) => {
  const hydrate = win().Reshow?.hydrate;
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
