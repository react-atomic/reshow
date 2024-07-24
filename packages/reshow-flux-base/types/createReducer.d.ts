export function getMitt<StateType, ActionType>(): {
    /**
     * @type Emiter<StateType, ActionType>['reset']
     */
    reset: Emiter<StateType, ActionType>["reset"];
    /**
     * @type Emiter<StateType, ActionType>['add']
     */
    add: Emiter<StateType, ActionType>["add"];
    /**
     * >>> 0 for change indexOf return -1 to 4294967295
     * @type Emiter<StateType, ActionType>['remove']
     */
    remove: Emiter<StateType, ActionType>["remove"];
    /**
     * @type Emiter<StateType, ActionType>['emit']
     */
    emit: Emiter<StateType, ActionType>["emit"];
};
export function refineAction<StateType, ActionType>(action: DispatchAction<StateType, ActionType>, params?: Payload, prevState?: StateType): ActionObject | ActionType;
export function createReducer<StateType, ActionType>(reducer: ReducerType<StateType, ActionType>, initState?: InitStateType<StateType>): [StoreObject<StateType, ActionType>, DispatchFunction<StateType, ActionType>];
export type InitStateType<StateType> = import("./type").InitStateType<StateType>;
export type ReducerType<StateType, ActionType> = import("./type").ReducerType<StateType, ActionType>;
export type DispatchFunction<StateType, ActionType> = import("./type").DispatchFunction<StateType, ActionType>;
export type DispatchAction<StateType, ActionType> = import("./type").DispatchAction<StateType, ActionType>;
export type ActionObject = import("./type").ActionObject;
export type StoreObject<StateType, ActionType> = import("./type").StoreObject<StateType, ActionType>;
export type Emiter<StateType, ActionType> = import("./type").Emiter<StateType, ActionType>;
export type FluxHandler<StateType, ActionType> = import("./type").FluxHandler<StateType, ActionType>;
export type RefinedAction<ActionType> = import("./type").RefinedAction<ActionType>;
export type Payload = import("./type").Payload;
