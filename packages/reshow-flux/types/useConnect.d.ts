export default useConnect;
export type StoreObject<StateType, ActionType> = import("reshow-flux-base").StoreObject<StateType, ActionType>;
export type UseConnectWithStore<StateType, ActionType> = {
    store: StoreObject<StateType, ActionType>;
    storeSyncState?: any;
};
export type CalculateStateCallback = (arg0: object, arg1: object) => object;
export type UseConnectOption<StateType, ActionType> = {
    calculateState: CalculateStateCallback;
    shouldComponentUpdate?: boolean;
    storeLocator?: (arg0: any) => StoreObject<StateType, ActionType>;
    displayName?: string;
};
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
 * @property {any} [storeSyncState]
 */
/**
 * @typedef {function(object, object): object} CalculateStateCallback
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
declare function useConnect<StateType, ActionType>(inputOptions: UseConnectOption<StateType, ActionType>): (props: any) => any;
