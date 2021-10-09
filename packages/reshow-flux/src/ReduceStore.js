import { Map, fromJS } from "immutable";
import { Store } from "reshow-flux-base";
import { toJS } from "get-object-value";

class ReduceStore extends Store {
  getInitialState() {
    return Map();
  }

  getMap(k) {
    return toJS(this.getState().get(k)) || {};
  }

  mergeMap(state, arrJS) {
    return state.merge(fromJS(arrJS));
  }
}

export default ReduceStore;
export { Map };
