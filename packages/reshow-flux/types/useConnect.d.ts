export default useConnect;
export type StateObject = Record<string, any>;
export type StoreObject<StateType, ActionType> = import("reshow-flux-base").StoreObject<StateType, ActionType>;
export type UseConnectWithStore<StateType, ActionType> = {
    store: StoreObject<StateType, ActionType>;
};
export type CalculateStateCallback = (prevState: StateObject, calculateOptions: any) => StateObject;
export type GetStateCallback = (props: StateObject) => StateObject;
export type UseConnectOption<StateType, ActionType> = {
    calculateState: CalculateStateCallback;
    shouldComponentUpdate?: boolean;
    storeLocator?: (arg0: any) => StoreObject<StateType, ActionType>;
    displayName?: string;
};
/**
 * @typedef {Record<string, any>} StateObject
 */
/**
 * @template StateType
 * @template ActionType
 * @typedef {import("reshow-flux-base").StoreObject<StateType, ActionType>} StoreObject
 */
/**
 * @template StateType
 * @template ActionType
 * @typedef {object} UseConnectWithStore
 * @property {StoreObject<StateType, ActionType>} store
 */
/**
 * @callback CalculateStateCallback
 * @param {StateObject} prevState
 * @param {any} calculateOptions
 * @returns {StateObject}
 */
/**
 * @callback GetStateCallback
 * @param {StateObject} props
 * @returns {StateObject}
 */
/**
 * @template StateType
 * @template ActionType
 * @typedef {object} UseConnectOption
 * @property {CalculateStateCallback} calculateState
 * @property {boolean} [shouldComponentUpdate]
 * @property {function(any):StoreObject<StateType, ActionType>} [storeLocator]
 * @property {string} [displayName]
 */
declare function useConnect<StateType, ActionType>(inputOptions: UseConnectOption<StateType, ActionType>): GetStateCallback;
