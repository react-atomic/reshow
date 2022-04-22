import { createReducer } from "reshow-flux-base";
import get from "get-object-value";
import { localStorage, Storage } from "get-storage";

const [store, localStorageDispatch] = createReducer(
  (state, action) => state.merge(action),
  new Storage(localStorage)
);

export default store;
export { localStorageDispatch };
