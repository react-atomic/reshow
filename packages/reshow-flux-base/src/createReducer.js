// @ts-check

/**
 * @template StateType
 *
 * @typedef {import('./type').InitStateType<StateType>} InitStateType
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import('./type').ReducerType<StateType, ActionType>} ReducerType
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import('./type').DispatchFunction<StateType, ActionType>} DispatchFunction
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import('./type').DispatchAction<StateType, ActionType>} DispatchAction
 */

/**
 * @typedef {import('./type').ActionObject} ActionObject
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {import('./type').StoreObject<StateType, ActionType>} StoreObject
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {import('./type').Emiter<StateType, ActionType>} Emiter
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {import('./type').FluxHandler<StateType, ActionType>} FluxHandler
 */

/**
 * @template ActionType
 * @typedef {import('./type').RefinedAction<ActionType>} RefinedAction
 */

/**
 * @typedef {import('./type').Payload} Payload
 */

/**
 * @param {any} maybeFunction
 * @returns {function(any=):any}
 */
const callfunc = (maybeFunction) => (args) =>
  "function" === typeof maybeFunction ? maybeFunction(args) : maybeFunction;

/**
 * @template StateType
 * @template ActionType
 *
 * @returns Emiter<StateType, ActionType>
 */
export const getMitt = () => {
  /**
   * @type FluxHandler<StateType, ActionType>[]
   */
  const pool = [];
  return {
    /**
     * @type Emiter<StateType, ActionType>['reset']
     */
    reset: () => pool.splice(0, pool.length),
    /**
     * @type Emiter<StateType, ActionType>['add']
     */
    add: (handler) => pool.push(handler),
    /**
     * >>> 0 for change indexOf return -1 to 4294967295
     * @type Emiter<StateType, ActionType>['remove']
     */
    remove: (handler) => pool.splice(pool.indexOf(handler) >>> 0, 1),
    /**
     * @type Emiter<StateType, ActionType>['emit']
     */
    emit: (state, action, prevState) => {
      const nextExec = pool.slice(0); //https://github.com/react-atomic/reshow/issues/96
      return () =>
        nextExec.reduce(
          (curState, curFunc) => curFunc(curState, action, prevState),
          state
        );
    },
  };
};

/**
 * Transpile dispatch("your-action-type", {foo: "bar"})
 * to dispatch({type: "your-action-type", params: {foo: "bar"}})
 *
 * @template StateType
 * @template ActionType
 *
 * @param {DispatchAction<StateType, ActionType>} action
 * @param {Payload} [params]
 * @param {StateType} [prevState]
 * @returns {ActionObject|ActionType} lazy actions
 */
export const refineAction = (action, params, prevState) => {
  let nextAction = Object.create(null);
  if (null != action) {
    if ("string" === typeof action) {
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
  return callfunc(nextAction)(prevState);
};

/**
 * @template StateType
 * @template ActionType
 *
 * @param {ReducerType<StateType, ActionType>} reducer
 * @param {InitStateType<StateType>} [initState]
 * @returns {[StoreObject<StateType, ActionType>, DispatchFunction<StateType, ActionType>]}
 */
export const createReducer = (reducer, initState) => {
  const state = { current: callfunc(initState)() };
  const mitt = getMitt();
  /**
   * @type {DispatchFunction<StateType, ActionType>}
   */
  const dispatch = (action, actionParams) => {
    const startingState = state.current;
    const refinedAction = refineAction(action, actionParams, startingState);
    const endingState = reducer(startingState, /**@type any*/ (refinedAction));
    if (endingState === undefined) {
      console.trace();
      throw `reducer() return undefined.`;
    }
    if (startingState !== endingState) {
      state.current = endingState;
      const runEmit = mitt.emit(endingState, refinedAction, startingState);
      setTimeout(runEmit);
    }
    return state.current;
  };
  const store = {
    reset: () => {
      mitt.reset();
      state.current = callfunc(initState)();
      return state.current;
    },
    getState: () => state.current,
    addListener: mitt.add,
    removeListener: mitt.remove,
  };
  return [store, dispatch];
};
