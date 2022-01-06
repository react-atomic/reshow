import { createReducer } from "reshow-flux-base";
import get from "get-object-value";
import { localStorage, Storage } from "get-storage";

const [store, localStorageDispatch] = createReducer((state, action) => {
  const params = get(action, ["params"]);
  return state.merge(params);
}, new Storage(localStorage));

export default store;
export { localStorageDispatch };
