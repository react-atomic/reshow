export default useConnect;
export type UseConnectWithStore = {
    store: import("reshow-flux-base").StoreObject;
    storeSyncState?: any;
};
export type UseConnectOption = {
    calculateState: Function;
    shouldComponentUpdate?: boolean;
    displayName?: string;
};
/**
 * @typedef {object} UseConnectWithStore
 * @property {import("reshow-flux-base").StoreObject} store
 * @property {any} [storeSyncState]
 */
/**
 * @typedef {object} UseConnectOption
 * @property {Function} calculateState
 * @property {boolean} [shouldComponentUpdate]
 * @property {string} [displayName]
 */
declare function useConnect(inputOptions: UseConnectOption): (props: any) => any;
