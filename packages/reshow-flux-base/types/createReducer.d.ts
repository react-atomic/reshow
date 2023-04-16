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
export function refineAction<StateType>(action: DispatchAction, params?: Payload, prevState?: StateType): ActionObject;
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
export default createReducer;
export type State<StateType> = StateType;
export type Payload = {
    [x: string]: any;
};
export type DispatchAction = string | boolean | ActionObject | Payload | ((arg0: State<any>) => ActionObject);
export type FluxHandler = (arg0: State<any> | null, arg1: ActionObject | null, arg2: State<any> | null) => State<any>;
export type EmitterResetCall = () => FluxHandler[];
export type EmitterAddCall = (handler: FluxHandler) => number;
export type EmitterRemoveCall = (handler: FluxHandler) => FluxHandler[];
export type EmitterEmitCall<StateType> = (state: State<StateType>, action: ActionObject, prevState: State<StateType>) => any;
export type emiter<StateType> = {
    reset: EmitterResetCall;
    add: EmitterAddCall;
    remove: EmitterRemoveCall;
    emit: EmitterEmitCall<StateType>;
};
export type InitStateType<StateType> = State<StateType> | (() => State<StateType>);
export type ReducerType<StateType> = (arg0: State<StateType>, arg1: ActionObject) => State<any>;
/**
 * @template StateType
 * @typedef {State<StateType>|function():State<StateType>} InitStateType
 */
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
