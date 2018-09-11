import {Map} from 'immutable';
import {Store} from 'reshow-flux-base';

class ReduceStore extends Store
{
  getInitialState()
  {
    return Map();
  }

  /* Following not extendable */
  getMap = (k, state)=>
  {
      if (!state) {
          state = this.getState();
      }
      let v = state.get(k);
      if (v && v.toJS) {
          v = v.toJS();
      }
      if (!v) {
          v = {};
      }
      return v;
  }
}

export default ReduceStore;
