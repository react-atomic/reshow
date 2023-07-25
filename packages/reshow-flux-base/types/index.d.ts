export { default as SimpleMap } from "./SimpleMap";
export type InitStateType<StateType> = import("./createReducer").InitStateType<StateType>;
export type ReducerType<StateType> = import("./createReducer").ReducerType<StateType>;
export type DispatchType<StateType> = import("./createReducer").DispatchType<StateType>;
export { default as createReducer, refineAction, StoreObject, ActionObject } from "./createReducer";
