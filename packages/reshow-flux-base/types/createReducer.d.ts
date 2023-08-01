/**
 * @typedef {Object.<string, any>} Payload
 */
/**
 * @interface
 */
export class ActionObject {
    /** @type {string=} */
    type: string | undefined;
    /** @type {Payload=} */
    params: Payload | undefined;
}
/**
 * @template StateType
 * @template ActionType
 * @interface
 */
export class StoreObject<StateType, ActionType> {
    /** @type {function():StateType} */
    reset: () => StateType;
    /** @type {function():StateType} */
    getState: () => StateType;
    /** @type {emiter<StateType, ActionType>["add"]} */
    addListener: emiter<StateType, ActionType>["add"];
    /** @type {emiter<StateType, ActionType>["remove"]} */
    removeListener: emiter<StateType, ActionType>["remove"];
}
export function refineAction<StateType, ActionType>(action: DispatchAction<StateType, ActionType>, params?: Payload, prevState?: StateType): ActionType;
export default createReducer;
export type Payload = {
    [x: string]: any;
};
export type InitStateType<StateType> = StateType | (() => StateType);
export type DispatchAction<StateType, ActionType> = string | boolean | null | ActionObject | Payload | ((arg0: StateType) => ActionType);
export type FluxHandler<StateType, ActionType> = (arg0: StateType | null, arg1: ActionType | null, arg2: StateType | null) => any;
export type EmitterResetCall<StateType, ActionType> = () => FluxHandler<StateType, ActionType>[];
export type EmitterAddCall<StateType, ActionType> = (handler: FluxHandler<StateType, ActionType>) => number;
export type EmitterRemoveCall<StateType, ActionType> = (handler: FluxHandler<StateType, ActionType>) => FluxHandler<StateType, ActionType>[];
export type EmitterEmitCall<StateType, ActionType> = (state: StateType, action: ActionType, prevState: StateType) => any;
export type ReducerType<StateType, ActionType> = (StateArg: StateType, ActionArg: ActionType) => any;
export type DispatchType<StateType, ActionType> = (action: DispatchAction<StateType, ActionType>, actionParams?: Payload) => StateType;
/**
 * @template StateType
 * @typedef {StateType|function():StateType} InitStateType
 */
/**
 * @template StateType
 * @template ActionType
 * @typedef {string|boolean|null|ActionObject|Payload|function(StateType):ActionType} DispatchAction
 */
/**
 * @template StateType
 * @template ActionType
 * @typedef {function(StateType?, ActionType?, StateType?):any} FluxHandler
 */
/**
 * @template StateType
 * @template ActionType
 * @callback EmitterResetCall
 * @returns {FluxHandler<StateType, ActionType>[]}
 */
/**
 * @template StateType
 * @template ActionType
 * @callback EmitterAddCall
 * @param {FluxHandler<StateType, ActionType>} handler
 * @returns {number}
 */
/**
 * @template StateType
 * @template ActionType
 * @callback EmitterRemoveCall
 * @param {FluxHandler<StateType, ActionType>} handler
 * @returns {FluxHandler<StateType, ActionType>[]}
 */
/**
 * @template StateType
 * @template ActionType
 * @callback EmitterEmitCall
 * @param {StateType} state
 * @param {ActionType} action
 * @param {StateType} prevState
 */
/**
 * @template StateType
 * @template ActionType
 * @interface
 */
declare class emiter<StateType, ActionType> {
    /** @type {EmitterResetCall<StateType, ActionType>} */
    reset: EmitterResetCall<StateType, ActionType>;
    /** @type {EmitterAddCall<StateType, ActionType>} */
    add: EmitterAddCall<StateType, ActionType>;
    /** @type {EmitterRemoveCall<StateType, ActionType>} */
    remove: EmitterRemoveCall<StateType, ActionType>;
    /** @type {EmitterEmitCall<StateType, ActionType>} */
    emit: EmitterEmitCall<StateType, ActionType>;
}
/**
 * @template StateType
 * @template ActionType
 * @callback ReducerType
 * @param {StateType} StateArg
 * @param {ActionType} ActionArg
 * @returns {any}
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
