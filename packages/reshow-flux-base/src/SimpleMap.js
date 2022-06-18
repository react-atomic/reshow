import { toJS } from "get-object-value";
import { OBJECT } from "reshow-constant";

class SimpleMap {
  _state = {};
  _update = false;

  constructor(obj, needUpdate) {
    if (obj) {
      this._state = obj;
    }
    if (needUpdate) {
      this._update = needUpdate;
    }
  }

  renew(state) {
    if (this._update) {
      this._state = state;
    }
    return new SimpleMap(state);
  }

  get(k) {
    return OBJECT === typeof this._state[k] && null !== this._state[k]
      ? new SimpleMap(this._state[k])
      : this._state[k];
  }

  set(k, v) {
    const state = { ...this._state, [k]: toJS(v) };
    return this.renew(state);
  }

  delete(k) {
    const state = { ...this._state };
    delete state[k];
    return this.renew(state);
  }

  merge(arr) {
    const state = {
      ...this._state,
      ...toJS(arr),
    };
    return this.renew(state);
  }

  toJS() {
    return this._state;
  }
}

export default SimpleMap;
