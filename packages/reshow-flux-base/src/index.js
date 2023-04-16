//@ts-check

/**
 * @template StateType
 * @typedef {import("./createReducer").StoreObject<StateType>} StoreObject
 */

/**
 * @template StateType
 * @typedef {import("./createReducer").InitStateType<StateType>} InitStateType
 */

/**
 * @typedef {import("./createReducer").ActionObject} ActionObject
 */

export { default as createReducer, refineAction } from "./createReducer";
export { default as SimpleMap } from "./SimpleMap";
