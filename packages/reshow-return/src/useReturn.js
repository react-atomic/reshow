import { useConnect } from "reshow-flux";
import connectOptions from "./connectOptions";

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
