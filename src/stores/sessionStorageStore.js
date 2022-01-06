import { createReducer } from "reshow-flux-base";
import get from "get-object-value";
import { sessionStorage, Storage } from "get-storage";

const [store, sessionStorageDispatch] = createReducer((state, action) => {
  const params = get(action, ["params"]);
  return state.merge(params);
}, new Storage(sessionStorage));

export default store;
export { sessionStorageDispatch };
