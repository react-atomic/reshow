import { createReducer } from "reshow-flux-base";
import get from "get-object-value";
import { localStorage, Storage } from "get-storage";

const [store, localDispatch] = createReducer((state, action) => {
  const params = get(action, ["params"]);
  return state.merge(params);
}, new Storage(localStorage));

export default store;
export { localDispatch };
