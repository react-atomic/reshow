// @ts-check

import callfunc from "call-func";
import { UNDEFINED, T_UNDEFINED, STRING, NEW_OBJ } from "reshow-constant";
import { StoreObject, Emiter } from "./type";

/**
 * @template StateType
 * @template ActionType
 * @typedef {import('./type').FluxHandler<StateType, ActionType>} FluxHandler
 */

/**
 * @template ActionType
 * @typedef {import('./type').RefineAction<ActionType>} RefineAction
 */

/**
 * @typedef {import('./type').Payload} Payload
 */

/**
 * @template StateType
 * @template ActionType
 * @callback DispatchCallback
 * @param {StateType} State
 * @returns {ActionType}
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {ActionType|DispatchCallback<StateType, ActionType>} DispatchAction
 */

/**
 * @template StateType
 * @template ActionType
 * @returns Emiter<StateType, ActionType>
 */
const getMitt = () => {
  /**
   * @type FluxHandler<StateType, ActionType>[]
   */
  const pool = [];
  return {
    /**
     * @type Emiter['reset']<StateType, ActionType>
     */
    reset: () => pool.splice(0, pool.length),
    /**
     * @type Emiter['add']<StateType, ActionType>
     */
    add: (handler) => pool.unshift(handler),
    /**
     * >>> 0 for change indexOf return -1 to 4294967295
     * @type Emiter['remove']<StateType, ActionType>
     */
    remove: (handler) => pool.splice(pool.indexOf(handler) >>> 0, 1),
    /**
     * @type Emiter['emit']<StateType, ActionType>
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
 * @template ActionType
 * @param {DispatchAction<StateType, ActionType>} action
 * @param {Payload} [params]
 * @param {StateType} [prevState]
 * @returns {RefineAction<ActionType>} lazy actions
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
 * @template ActionType
 * @callback ReducerType
 * @param {StateType} StateArg
 * @param {RefineAction<ActionType>} ActionArg
 * @returns {StateType}
 */

/**
 * @template StateType
 * @typedef {StateType|function():StateType} InitStateType
 */

/**
 * @template StateType
 * @template ActionType
 * @callback DispatchType
 * @param {DispatchAction<StateType, ActionType>} action
 * @param {Payload} [actionParams]
 * @returns {StateType} endingState
 */

/**
 * @template StateType
 * @template ActionType
 * @param {ReducerType<StateType, ActionType>} reducer
 * @param {InitStateType<StateType>} [initState]
 * @returns {[StoreObject<StateType, ActionType>, DispatchType<StateType, ActionType>]}
 */
const createReducer = (reducer, initState) => {
  const state = { current: callfunc(initState) };
  const mitt = getMitt();
  /**
   * @type {DispatchType<StateType, ActionType>}
   */
  const dispatch = (action, actionParams) => {
    const startingState = state.current;
    const thisAction = refineAction(action, actionParams, startingState);
    const endingState = reducer(startingState, thisAction);
    if (endingState === T_UNDEFINED) {
      console.trace();
      throw `reducer() return ${UNDEFINED}.`;
    }
    if (startingState !== endingState) {
      state.current = endingState;
      mitt.emit(endingState, thisAction, startingState);
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
