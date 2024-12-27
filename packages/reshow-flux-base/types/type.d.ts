declare const _default: {};
export default _default;
export type Payload = {
    [x: string]: any;
};
export type RefinedAction<ActionType = ActionObject> = ActionType | ActionObject;
export type FluxHandler<StateType, ActionType> = (NextState?: StateType | undefined, Action?: RefinedAction<ActionType> | undefined, PrevState?: StateType | undefined) => any;
export type EmitterEmitCall<StateType, ActionType> = (state?: StateType | undefined, action?: RefinedAction<ActionType> | undefined, prevState?: StateType | undefined) => any;
export type EmitterResetCall<StateType, ActionType> = () => FluxHandler<StateType, ActionType>[];
export type EmitterAddCall<StateType, ActionType> = (handler: FluxHandler<StateType, ActionType>) => number;
export type EmitterRemoveCall<StateType, ActionType> = (handler: FluxHandler<StateType, ActionType>) => FluxHandler<StateType, ActionType>[];
export type InitStateType<StateType> = StateType | (() => StateType);
export type ReducerType<StateType, ActionType> = (ReducerState: StateType, ReducerAction: ActionType) => StateType;
export type DispatchCallback<StateType, ActionType> = (State: StateType) => ActionType;
export type DispatchAction<StateType, ActionType> = string | ActionType | DispatchCallback<StateType, ActionType>;
export type ActionObject = {
    type: string;
    params?: (Payload | null) | undefined;
};
export type Emiter<StateType, ActionType> = {
    reset: EmitterResetCall<StateType, ActionType>;
    add: EmitterAddCall<StateType, ActionType>;
    remove: EmitterRemoveCall<StateType, ActionType>;
    emit: EmitterEmitCall<StateType, ActionType>;
};
export type StoreObject<StateType, ActionType> = {
    reset: () => StateType;
    getState: () => StateType;
    addListener: Emiter<StateType, ActionType>["add"];
    removeListener: Emiter<StateType, ActionType>["remove"];
};
export type DispatchFunction<StateType, ActionType> = (action: DispatchAction<StateType, ActionType>, actionParams?: Payload) => StateType;
export type ReducerStoreAndDispatch<StateType, ActionType> = [StoreObject<StateType, ActionType>, DispatchFunction<StateType, ActionType>];
