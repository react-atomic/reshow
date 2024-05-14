export default useConnect;
export type StoreObject<StateType, ActionType> = import("reshow-flux-base").StoreObject<StateType, ActionType>;
export type UseConnectWithStore<StateType, ActionType> = {
    store: StoreObject<StateType, ActionType>;
};
export type CalculateStateCallback<StateType> = (prevState: StateType | any, calculateOptions: any) => StateType;
export type GetStateCallback<StateType> = (props: any) => StateType;
export type UseConnectOption<StateType, ActionType> = {
    calculateState: CalculateStateCallback<StateType>;
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
 */
/**
 * @template StateType
 *
 * @callback CalculateStateCallback
 * @param {StateType|any} prevState
 * @param {any} calculateOptions
 * @returns {StateType}
 */
/**
 * @template StateType
 *
 * @callback GetStateCallback
 * @param {any} props
 * @returns {StateType}
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} UseConnectOption
 * @property {CalculateStateCallback<StateType>} calculateState
 * @property {boolean} [shouldComponentUpdate]
 * @property {function(any):StoreObject<StateType, ActionType>} [storeLocator]
 * @property {string} [displayName]
 */
declare function useConnect<StateType, ActionType>(inputOptions: UseConnectOption<StateType, ActionType>): GetStateCallback<StateType>;
