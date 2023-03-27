// @ts-check

import callfunc from "call-func";
import { UNDEFINED, T_UNDEFINED, STRING, NEW_OBJ } from "reshow-constant";

/**
 * @template StateType
 * @typedef {StateType} State
 */

/**
 * @typedef {Object.<string, any>} Payload
 */

/**
 * @typedef {object} ActionObject
 * @property {string} [type]
 * @property {Payload} [params]
 */

/**
 * @typedef {string|boolean|ActionObject|Payload|function(State<any>):ActionObject} DispatchAction
 */

/**
 * @typedef {function(State<any>?, ActionObject?, State<any>?):State<any>} FluxHandler
 */

/**
 * @callback EmitterResetCall
 * @returns {FluxHandler[]}
 */

/**
 * @callback EmitterAddCall
 * @param {FluxHandler} handler
 * @returns {number}
 */

/**
 * @callback EmitterRemoveCall
 * @param {FluxHandler} handler
 * @returns {FluxHandler[]}
 */

/**
 * @template StateType
 * @callback EmitterEmitCall
 * @param {State<StateType>} state
 * @param {ActionObject} action
 * @param {State<StateType>} prevState
 */

/**
 * @template StateType
 * @typedef {object} emiter
 * @property {EmitterResetCall} reset
 * @property {EmitterAddCall} add
 * @property {EmitterRemoveCall} remove
 * @property {EmitterEmitCall<StateType>} emit
 */

/**
 * @template StateType
 * @returns emiter
 */
const getMitt = () => {
  /**
   * @type FluxHandler[]
   */
  const pool = [];
  return {
    /**
     * @type EmitterResetCall
     */
    reset: () => pool.splice(0, pool.length),
    /**
     * @type EmitterAddCall
     */
    add: (handler) => pool.unshift(handler),
    /**
     * >>> 0 for change indexOf return -1 to 4294967295
     * @type EmitterRemoveCall
     */
    remove: (handler) => pool.splice(pool.indexOf(handler) >>> 0, 1),
    /**
     * @type EmitterEmitCall<StateType>
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
 * @template StateType
 * @param {DispatchAction} action
 * @param {Payload} [params]
 * @param {State<StateType>} [prevState]
 * @returns {ActionObject} lazy actions
 */
export const refineAction = (action, params, prevState) => {
  let nextAction = NEW_OBJ();
  if (null != action) {
    if (STRING === typeof action) {
      nextAction = {
        type: action,
      };
      if (params) {
        nextAction.params = params;
      }
    } else {
      nextAction = action;
    }
  }
  return callfunc(nextAction, [prevState]);
};

/**
 * @template StateType
 * @typedef {function():State<StateType>} GetState
 */

/**
 * @template StateType
 * @typedef {object} StoreObject
 * @property {function():State<StateType>} reset
 * @property {GetState<StateType>} getState
 * @property {emiter<StateType>["add"]} addListener
 * @property {emiter<StateType>["remove"]} removeListener
 */

/**
 * @template StateType
 * @typedef {State<StateType>|function():State<StateType>} InitStateType
 */

/**
 * @template StateType
 * @typedef {function(State<StateType>, ActionObject): State<any>} ReducerType
 */

/**
 * @template StateType
 * @param {ReducerType<StateType>} reducer
 * @param {InitStateType<StateType>} [initState]
 * @returns {[StoreObject<StateType>, dispatch]}
 */
const createReducer = (reducer, initState) => {
  const state = { current: callfunc(initState) };
  const mitt = getMitt();
  /**
   * @param {DispatchAction} action
   * @param {Payload} [actionParams]
   * @returns {State<StateType>} endingState
   */
  const dispatch = (action, actionParams) => {
    const startingState = state.current;
    action = refineAction(action, actionParams, startingState);
    const endingState = reducer(startingState, action);
    if (endingState === T_UNDEFINED) {
      console.trace();
      throw `reducer() return ${UNDEFINED}.`;
    }
    if (startingState !== endingState) {
      state.current = endingState;
      mitt.emit(endingState, action, startingState);
    }
    return endingState;
  };
  const store = {
    reset: () => {
      if (mitt.reset()) {
        state.current = callfunc(initState);
      }
      return state.current;
    },
    getState: () => state.current,
    addListener: mitt.add,
    removeListener: mitt.remove,
  };
  return [store, dispatch];
};

export default createReducer;
