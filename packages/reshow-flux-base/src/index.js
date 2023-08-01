//@ts-check

/**
 * @template StateType
 * @typedef {import("./createReducer").InitStateType<StateType>} InitStateType
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {import("./createReducer").ReducerType<StateType, ActionType>} ReducerType
 */

/**
 * @template StateType
 * @template ActionType
 * @typedef {import("./createReducer").DispatchType<StateType, ActionType>} DispatchType
 */

export {
  default as createReducer,
  refineAction,
  StoreObject,
  ActionObject,
} from "./createReducer";
export { default as SimpleMap } from "./SimpleMap";
