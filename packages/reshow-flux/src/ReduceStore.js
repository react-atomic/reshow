import {Map} from 'immutable';
import {Store} from 'reshow-flux-base';
import {toJS} from 'get-object-value';

class ReduceStore extends Store {
  getInitialState() {
    return Map();
  }

  getMap(k) {
    return toJS(this.getState().get(k)) || {};
  }
}

export default ReduceStore;
