/**
 * @template StateType
 * @typedef {StateType} State
 */
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
 * @interface
 */
export class StoreObject<StateType> {
    /** @type {function():State<StateType>} */
    reset: () => State<StateType>;
    /** @type {function():State<StateType>} */
    getState: () => State<StateType>;
    /** @type {emiter<StateType>["add"]} */
    addListener: emiter<StateType>["add"];
    /** @type {emiter<StateType>["remove"]} */
    removeListener: emiter<StateType>["remove"];
}
export function refineAction<StateType>(action: DispatchAction, params?: Payload, prevState?: StateType): ActionObject;
export default createReducer;
export type State<StateType> = StateType;
export type Payload = {
    [x: string]: any;
};
export type InitStateType<StateType> = State<StateType> | (() => State<StateType>);
export type DispatchAction = string | boolean | ActionObject | Payload | ((arg0: State<any>) => ActionObject);
export type FluxHandler = (arg0: State<any> | null, arg1: ActionObject | null, arg2: State<any> | null) => State<any>;
export type EmitterResetCall = () => FluxHandler[];
export type EmitterAddCall = (handler: FluxHandler) => number;
export type EmitterRemoveCall = (handler: FluxHandler) => FluxHandler[];
export type EmitterEmitCall<StateType> = (state: State<StateType>, action: ActionObject, prevState: State<StateType>) => any;
export type ReducerType<StateType> = (arg0: State<StateType>, arg1: ActionObject) => State<any>;
/**
 * @template StateType
 * @typedef {State<StateType>|function():State<StateType>} InitStateType
 */
/**
 * @typedef {string|boolean|ActionObject|Payload|function(State<any>):ActionObject} DispatchAction
 */
/**
 * @typedef {function(State<any>?, ActionObject?, State<any>?):State<any>} FluxHandler
 */
/**
 * @callback EmitterResetCall
 * @returns {FluxHandler[]}
 */
/**
 * @callback EmitterAddCall
 * @param {FluxHandler} handler
 * @returns {number}
 */
/**
 * @callback EmitterRemoveCall
 * @param {FluxHandler} handler
 * @returns {FluxHandler[]}
 */
/**
 * @template StateType
 * @callback EmitterEmitCall
 * @param {State<StateType>} state
 * @param {ActionObject} action
 * @param {State<StateType>} prevState
 */
/**
 * @template StateType
 * @interface
 */
declare class emiter<StateType> {
    /** @type {EmitterResetCall} */
    reset: EmitterResetCall;
    /** @type {EmitterAddCall} */
    add: EmitterAddCall;
    /** @type {EmitterRemoveCall} */
    remove: EmitterRemoveCall;
    /** @type {EmitterEmitCall<StateType>} */
    emit: EmitterEmitCall<StateType>;
}
/**
 * @template StateType
 * @typedef {function(State<StateType>, ActionObject): State<any>} ReducerType
 */
/**
 * @template StateType
 * @param {ReducerType<StateType>} reducer
 * @param {InitStateType<StateType>} [initState]
 * @returns {[StoreObject<StateType>, dispatch]}
 */
declare function createReducer<StateType>(reducer: ReducerType<StateType>, initState?: InitStateType<StateType>): [StoreObject<StateType>, (action: DispatchAction, actionParams?: Payload) => StateType];
