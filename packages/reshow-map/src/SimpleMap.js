// @ts-check
import get, { toJS } from "get-object-value";
import { OBJECT, KEYS } from "reshow-constant";

const toSimpleMap = (/** @type any */ v) =>
  OBJECT === typeof v && null !== v ? new SimpleMap(v) : v;

export class SimpleMap {
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
    return toSimpleMap(this._state[k]);
  }

  /**
   * @param {(string | number)[]} path
   */
  getIn(path) {
    return toSimpleMap(get(this._state, path));
  }

  /**
   * @param {function(any, any=):void} cb
   */
  forEach(cb) {
    KEYS(this._state).forEach((k) => cb(this.get(k), k));
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
