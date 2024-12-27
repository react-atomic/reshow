export type InitStateType<StateType> = import("./type").InitStateType<StateType>;
export type ReducerType<StateType, ActionType> = import("./type").ReducerType<StateType, ActionType>;
export type FluxHandler<StateType, ActionType> = import("./type").FluxHandler<StateType, ActionType>;
export type DispatchFunction<StateType, ActionType> = import("./type").DispatchFunction<StateType, ActionType>;
export type StoreObject<StateType, ActionType> = import("./type").StoreObject<StateType, ActionType>;
export type ReducerStoreAndDispatch<StateType, ActionType> = import("./type").ReducerStoreAndDispatch<StateType, ActionType>;
export type ActionObject = import("./type").ActionObject;
export { createReducer, refineAction, getMitt } from "./createReducer";
