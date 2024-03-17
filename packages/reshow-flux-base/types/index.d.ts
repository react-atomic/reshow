export { default as SimpleMap } from "./SimpleMap";
export type InitStateType<StateType> = import("./createReducer").InitStateType<StateType>;
export type ReducerType<StateType, ActionType> = import("./createReducer").ReducerType<StateType, ActionType>;
export type DispatchFunction<StateType, ActionType> = import("./createReducer").DispatchFunction<StateType, ActionType>;
export { default as createReducer, refineAction } from "./createReducer";
export { StoreObject, ActionObject } from "./type";
