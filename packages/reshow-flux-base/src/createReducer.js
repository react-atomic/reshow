import callfunc from "call-func";
import { UNDEFINED, T_UNDEFINED } from "reshow-constant";

const emitter = () => {
  const pool = [];
  return {
    reset: () => pool.splice(0, pool.length),
    add: (handler) => pool.unshift(handler),
    // >>> 0 for change indexOf return -1 to 4294967295
    remove: (handler) => pool.splice(pool.indexOf(handler) >>> 0, 1),
    emit: (state, action) =>
      setTimeout(() => {
        let i = pool.length;
        while (i--) {
          const func = pool[i];
          func && func(state, action);
        }
      }),
  };
};

const refineAction = (action = {}, params) => {
  if (action.trim) {
    action = { type: action };
    params && (action.params = params);
  }
  return action;
};

const createReducer = (reduce, initState = {}) => {
  const state = { current: callfunc(initState) };
  const mitt = emitter();
  const dispatch = (...action) => {
    action = refineAction(...action);
    const startingState = state.current;
    const endingState = reduce(startingState, action);
    if (endingState === T_UNDEFINED) {
      console.trace();
      throw `reduce() return ${UNDEFINED}.`;
    }
    if (startingState !== endingState) {
      state.current = endingState;
      mitt.emit(state, action);
    }
  };
  const store = {
    reset: () => {
      mitt.reset();
      return callfunc(initState);
    },
    getState: () => state.current,
    addListener: mitt.add,
    removeListener: mitt.remove,
  };
  return [store, dispatch];
};

export default createReducer;
export { refineAction };
