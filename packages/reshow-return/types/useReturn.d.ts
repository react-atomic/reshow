export default useReturn;
export type UseReturnPayLoad = object;
export type UseReturnType = (initStates: import('./connectOptions').InitStatesProps, store: import("reshow-flux-base").StoreObject<any>, payload?: UseReturnPayLoad) => any;
/**
 * @typedef {object} UseReturnPayLoad
 * @param {{[key: string]: string[]}} [pathStates]
 * @param {boolean} [immutable]
 */
/**
 * @callback UseReturnType
 * @param {import('./connectOptions').InitStatesProps} initStates
 * @param {import("reshow-flux-base").StoreObject} store
 * @param {UseReturnPayLoad} [payload]
 */
/**
 * @type UseReturnType
 */
declare const useReturn: UseReturnType;
