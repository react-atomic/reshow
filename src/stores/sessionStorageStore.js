import { createReducer } from "reshow-flux-base";
import get from "get-object-value";
import { sessionStorage, Storage } from "get-storage";

const [store, sessionStorageDispatch] = createReducer(
  (state, action) => state.merge(action),
  new Storage(sessionStorage)
);

export default store;
export { sessionStorageDispatch };
