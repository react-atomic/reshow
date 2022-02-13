import { toJS } from "get-object-value";
import { OBJECT } from "reshow-constant";

class SimpleMap {
  _state = {};

  constructor(obj) {
    if (obj) {
      this._state = obj;
    }
  }

  get(k) {
    return OBJECT === typeof this._state[k] && null !== this._state[k]
      ? new SimpleMap(this._state[k])
      : this._state[k];
  }

  set(k, v) {
    const state = { ...this._state, [k]: toJS(v) };
    this._state = state;
    return new SimpleMap(state);
  }

  delete(k) {
    const state = { ...this._state };
    delete state[k];
    this._state = state;
    return new SimpleMap(state);
  }

  merge(arr) {
    const state = {
      ...this._state,
      ...toJS(arr),
    };
    this._state = state;
    return new SimpleMap(state);
  }

  toJS() {
    return this._state;
  }
}

export default SimpleMap;
