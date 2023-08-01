export default useConnect;
export type UseConnectWithStore<StateType, ActionType> = {
    store: import("reshow-flux-base").StoreObject<StateType, ActionType>;
    storeSyncState?: any;
};
export type CalculateStateCallback = (arg0: object, arg1: object) => object;
export type UseConnectOption = {
    calculateState: CalculateStateCallback;
    shouldComponentUpdate?: boolean;
    displayName?: string;
};
/**
 * @template StateType
 * @template ActionType
 * @typedef {object} UseConnectWithStore
 * @property {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @property {any} [storeSyncState]
 */
/**
 * @typedef {function(object, object): object} CalculateStateCallback
 */
/**
 * @typedef {object} UseConnectOption
 * @property {CalculateStateCallback} calculateState
 * @property {boolean} [shouldComponentUpdate]
 * @property {string} [displayName]
 */
declare function useConnect(inputOptions: UseConnectOption): (props: any) => any;
