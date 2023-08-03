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

export { default as createReducer, refineAction } from "./createReducer";
export { StoreObject, ActionObject } from "./type";
export { default as SimpleMap } from "./SimpleMap";
