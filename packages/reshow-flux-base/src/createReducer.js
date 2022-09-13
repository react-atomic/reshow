// @ts-check

import callfunc from "call-func";
import { UNDEFINED, T_UNDEFINED } from "reshow-constant";

/**
 * @typedef {object} emiter
 * @property {function} reset
 * @property {function} add
 * @property {function} remove
 * @property {function} emit
 */

/**
 * @template T
 * @typedef {T} state
 */

/**
 * @returns emiter
 */
const getMitt = () => {
  const pool = [];
  return {
    /**
     * @returns {array}
     */
    reset: () => pool.splice(0, pool.length),
    /**
     * @param {function} handler
     * @returns {number}
     */
    add: (handler) => pool.unshift(handler),
    /**
     * >>> 0 for change indexOf return -1 to 4294967295
     * @param {function} handler
     * @returns {array}
     */
    remove: (handler) => pool.splice(pool.indexOf(handler) >>> 0, 1),
    /**
     * @template T
     * @param {state<T>} state
     * @param {object} action
     * @param {state<T>} prevState
     */
    emit: (state, action, prevState) => {
      const nextExec = pool.slice(0); //https://github.com/react-atomic/reshow/issues/96
      setTimeout(() => {
        let i = nextExec.length;
        while (i--) {
          nextExec[i](state, action, prevState);
        }
      });
    },
  };
};

/**
 * Transpile dispatch("your-action-type", {foo: "bar"})
 * to dispatch({type: "your-action-type", params: {foo: "bar"}})
 *
 * @template T
 * @param {string|object|function} action
 * @param {object} params
 * @param {state<T>} prevState
 * @returns {object} lazy actions
 */
const refineAction = (action, params, prevState) => {
  action = action || {};
  if (action.trim) {
    action = { type: action };
    params && (action.params = params);
  }
  return callfunc(action, [prevState]);
};


/**
 * @typedef {Object} StoreType 
 */

/**
 * @template T
 * @param {function} reduce
 * @param {state<T>|function} initState
 * @returns {[StoreType, dispatch]}
 */
const createReducer = (reduce, initState) => {
  const state = { current: callfunc(initState || {}) };
  const mitt = getMitt();
  /**
   * @template T
   * @function dispatch
   * @param {string|object|function} action
   * @param {object} actionParams
   * @returns {state<T>} endingState
   */
  const dispatch = (action, actionParams) => {
    const startingState = state.current;
    action = refineAction(action, actionParams, startingState);
    const endingState = reduce(startingState, action);
    if (endingState === T_UNDEFINED) {
      console.trace();
      throw `reduce() return ${UNDEFINED}.`;
    }
    if (startingState !== endingState) {
      state.current = endingState;
      mitt.emit(endingState, action, startingState);
    }
    return endingState;
  };
  const store = {
    reset: () => mitt.reset() && callfunc(initState || {}),
    getState: () => state.current,
    addListener: mitt.add,
    removeListener: mitt.remove,
  };
  return [store, dispatch];
};

export default createReducer;
export { refineAction };
