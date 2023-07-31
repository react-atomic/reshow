export default useReturn;
export type UseReturnPayLoad = {
    pathStates?: {
        [key: string]: string[];
    };
    excludeStates?: string[];
    immutable?: boolean;
};
export type UseReturnType = (initStates: import('./connectOptions').InitStatesProps, store: import("reshow-flux-base").StoreObject<any>, payload?: UseReturnPayLoad) => any;
/**
 * @typedef {object} UseReturnPayLoad
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {string[]} [excludeStates]
 * @property {boolean} [immutable]
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
