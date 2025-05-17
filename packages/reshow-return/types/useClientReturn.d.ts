export default useClientReturn;
export type UseReturnPayLoad = import("./useReturn").UseReturnPayLoad;
export type UseClientReturnPayLoad = object & UseReturnPayLoad;
export type UseClientReturnType<StateType, ActionType> = (initStates: import("./connectOptions").InitStatesType | null, store: import("reshow-flux-base").StoreObject<StateType, ActionType>, payload?: UseClientReturnPayLoad) => StateType;
/**
 * @typedef {import('./useReturn').UseReturnPayLoad} UseReturnPayLoad
 */
/**
 * @typedef {object&UseReturnPayLoad} UseClientReturnPayLoad
 * @property {boolean} [isHydrate]
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @callback UseClientReturnType
 * @param {import('./connectOptions').InitStatesType?} initStates
 * @param {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @param {UseClientReturnPayLoad} [payload]
 *
 * @returns {StateType}
 *
 */
/**
 * @type {UseClientReturnType<any, any>}
 */
declare const useClientReturn: UseClientReturnType<any, any>;
