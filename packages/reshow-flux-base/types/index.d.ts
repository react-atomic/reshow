export { default as SimpleMap } from "./SimpleMap";
export type InitStateType<StateType> = import("./createReducer").InitStateType<StateType>;
export type ReducerType<StateType, ActionType> = import("./createReducer").ReducerType<StateType, ActionType>;
export type DispatchType<StateType, ActionType> = import("./createReducer").DispatchType<StateType, ActionType>;
export { default as createReducer, refineAction } from "./createReducer";
export { StoreObject, ActionObject } from "./type";
