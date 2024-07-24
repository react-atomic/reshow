export type InitStateType<StateType> = import("./type").InitStateType<StateType>;
export type ReducerType<StateType, ActionType> = import("./type").ReducerType<StateType, ActionType>;
export type DispatchFunction<StateType, ActionType> = import("./type").DispatchFunction<StateType, ActionType>;
export type StoreObject<StateType, ActionType> = import("./type").StoreObject<StateType, ActionType>;
export type ActionObject = import("./type").ActionObject;
export { createReducer, refineAction, getMitt } from "./createReducer";
