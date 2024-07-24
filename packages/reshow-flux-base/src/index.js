//@ts-check

/**
 * @template StateType
 *
 * @typedef {import("./type").InitStateType<StateType>} InitStateType
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("./type").ReducerType<StateType, ActionType>} ReducerType
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("./type").DispatchFunction<StateType, ActionType>} DispatchFunction
 */

/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("./type").StoreObject<StateType, ActionType>} StoreObject
 */

/**
 * @typedef {import("./type").ActionObject} ActionObject
 */

export { createReducer, refineAction, getMitt } from "./createReducer";
