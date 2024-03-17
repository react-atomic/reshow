export function refineAction<StateType, ActionType>(action: DispatchAction<StateType, ActionType>, params?: Payload, prevState?: StateType): ActionObject | ActionType;
export default createReducer;
export type FluxHandler<StateType, ActionType> = import('./type').FluxHandler<StateType, ActionType>;
export type RefinedAction<ActionType> = import('./type').RefinedAction<ActionType>;
export type Payload = import('./type').Payload;
export type DispatchCallback<StateType, ActionType> = (State: StateType) => ActionType;
export type DispatchAction<StateType, ActionType> = string | ActionType | DispatchCallback<StateType, ActionType>;
export type ReducerType<StateType, ActionType> = (ReducerState: StateType, ReducerAction: ActionType) => StateType;
export type InitStateType<StateType> = StateType | (() => StateType);
export type DispatchFunction<StateType, ActionType> = (action: DispatchAction<StateType, ActionType>, actionParams?: Payload) => StateType;
import { ActionObject } from "./type";
/**
 * @template StateType
 * @template ActionType
 *
 * @callback ReducerType
 * @param {StateType} ReducerState
 * @param {ActionType} ReducerAction
 * @returns {StateType}
 */
/**
 * @template StateType
 * @typedef {StateType|function():StateType} InitStateType
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @callback DispatchFunction
 * @param {DispatchAction<StateType, ActionType>} action
 * @param {Payload} [actionParams]
 * @returns {StateType} endingState
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @param {ReducerType<StateType, ActionType>} reducer
 * @param {InitStateType<StateType>} [initState]
 * @returns {[StoreObject<StateType, ActionType>, DispatchFunction<StateType, ActionType>]}
 */
declare function createReducer<StateType, ActionType>(reducer: ReducerType<StateType, ActionType>, initState?: InitStateType<StateType>): [StoreObject<StateType, ActionType>, DispatchFunction<StateType, ActionType>];
import { StoreObject } from "./type";
