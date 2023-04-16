export { default as SimpleMap } from "./SimpleMap";
export type StoreObject<StateType> = import("./createReducer").StoreObject<StateType>;
export type InitStateType<StateType> = import("./createReducer").InitStateType<StateType>;
export type ActionObject = import("./createReducer").ActionObject;
export { default as createReducer, refineAction } from "./createReducer";
