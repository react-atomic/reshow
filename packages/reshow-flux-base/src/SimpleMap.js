// @ts-check
import { toJS } from "get-object-value";
import { OBJECT } from "reshow-constant";

class SimpleMap {
  _state = {};
  _update = false;

  /**
   * @param {object} obj
   * @param {boolean} needUpdate
   */
  constructor(obj, needUpdate = false) {
    if (obj) {
      this._state = obj;
    }
    if (needUpdate) {
      this._update = needUpdate;
    }
  }

  /**
   * @param {object} obj
   * @returns {SimpleMap}
   */
  renew(obj) {
    if (this._update) {
      this._state = obj;
    }
    return new SimpleMap(obj);
  }

  /**
   * @param {string} k
   * @returns {any}
   */
  get(k) {
    return OBJECT === typeof this._state[k] && null !== this._state[k]
      ? new SimpleMap(this._state[k])
      : this._state[k];
  }

  /**
   * @param {string} k
   * @param {any} v
   * @returns {SimpleMap}
   */
  set(k, v) {
    const state = { ...this._state, [k]: toJS(v) };
    return this.renew(state);
  }

  /**
   * @param {string} k
   * @returns {SimpleMap}
   */
  delete(k) {
    const state = { ...this._state };
    delete state[k];
    return this.renew(state);
  }

  /**
   * @param {object|SimpleMap} arr
   * @returns {SimpleMap}
   */
  merge(arr) {
    const state = {
      ...this._state,
      ...toJS(arr),
    };
    return this.renew(state);
  }

  /**
   * @returns {object}
   */
  toJS() {
    return this._state;
  }
}

export default SimpleMap;
