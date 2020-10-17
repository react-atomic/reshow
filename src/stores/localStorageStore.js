import { ReduceStore } from "reshow-flux";
import get from "get-object-value";
import { localStorage, Storage } from "get-storage";

import storageDispatcher from "../storageDispatcher";

class LocalStorageStore extends ReduceStore {
  getInitialState() {
    return new Storage(localStorage);
  }

  updateStorage(state, action) {
    const params = get(action, ["params"]);
    return state.merge(params);
  }

  reduce(state, action) {
    switch (action.type) {
      case "local":
        return this.updateStorage(state, action);
      default:
        return state;
    }
  }
}

export default new LocalStorageStore(storageDispatcher);

export { LocalStorageStore };
