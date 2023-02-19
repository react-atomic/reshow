export function refineAction<StateType>(action: ActionType, params?: Payload, prevState?: StateType): ActionObject;
export default createReducer;
export type State<StateType> = StateType;
export type Payload = object;
export type ActionObject = {
    type?: string;
    params?: Payload;
};
export type ActionType = string | ActionObject | ((arg0: State<any>) => ActionObject);
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
export type GetState<StateType> = () => State<StateType>;
export type StoreObject<StateType> = {
    reset: () => State<StateType>;
    getState: GetState<StateType>;
    addListener: emiter<StateType>["add"];
    removeListener: emiter<StateType>["remove"];
};
export type InitStateType<StateType> = State<StateType> | (() => State<StateType>);
export type ReducerType<StateType> = (arg0: State<StateType>, arg1: ActionObject) => State<any>;
/**
 * @template StateType
 * @typedef {function():State<StateType>} GetState
 */
/**
 * @template StateType
 * @typedef {object} StoreObject
 * @property {function():State<StateType>} reset
 * @property {GetState<StateType>} getState
 * @property {emiter<StateType>["add"]} addListener
 * @property {emiter<StateType>["remove"]} removeListener
 */
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
declare function createReducer<StateType>(reducer: ReducerType<StateType>, initState?: InitStateType<StateType>): [StoreObject<StateType>, (action: ActionType, actionParams?: Payload) => StateType];
