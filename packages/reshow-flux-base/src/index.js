//@ts-check

/**
 * @template StateType
 * @typedef {import("./createReducer").InitStateType<StateType>} InitStateType
 */

/**
 * @template StateType
 * @typedef {import("./createReducer").ReducerType<StateType>} ReducerType
 */

/**
 * @template StateType
 * @typedef {import("./createReducer").DispatchType<StateType>} DispatchType
 */

export {
  default as createReducer,
  refineAction,
  StoreObject,
  ActionObject,
} from "./createReducer";
export { default as SimpleMap } from "./SimpleMap";
