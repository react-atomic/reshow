export function refineAction<StateType, ActionType>(action: DispatchAction<StateType, ActionType>, params?: Payload, prevState?: StateType): ActionType;
export default createReducer;
export type FluxHandler<StateType, ActionType> = import('./type').FluxHandler<StateType, ActionType>;
export type RefineAction<ActionType> = import('./type').RefineAction<ActionType>;
export type Payload = import('./type').Payload;
export type DispatchCallback<StateType, ActionType> = (State: StateType) => ActionType;
export type DispatchAction<StateType, ActionType> = ActionType | DispatchCallback<StateType, ActionType>;
export type ReducerType<StateType, ActionType> = (StateArg: StateType, ActionArg: RefineAction<ActionType>) => StateType;
export type InitStateType<StateType> = StateType | (() => StateType);
export type DispatchType<StateType, ActionType> = (action: DispatchAction<StateType, ActionType>, actionParams?: Payload) => StateType;
/**
 * @template StateType
 * @template ActionType
 * @callback ReducerType
 * @param {StateType} StateArg
 * @param {RefineAction<ActionType>} ActionArg
 * @returns {StateType}
 */
/**
 * @template StateType
 * @typedef {StateType|function():StateType} InitStateType
 */
/**
 * @template StateType
 * @template ActionType
 * @callback DispatchType
 * @param {DispatchAction<StateType, ActionType>} action
 * @param {Payload} [actionParams]
 * @returns {StateType} endingState
 */
/**
 * @template StateType
 * @template ActionType
 * @param {ReducerType<StateType, ActionType>} reducer
 * @param {InitStateType<StateType>} [initState]
 * @returns {[StoreObject<StateType, ActionType>, DispatchType<StateType, ActionType>]}
 */
declare function createReducer<StateType, ActionType>(reducer: ReducerType<StateType, ActionType>, initState?: InitStateType<StateType>): [StoreObject<StateType, ActionType>, DispatchType<StateType, ActionType>];
import { StoreObject } from "./type";
