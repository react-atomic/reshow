export default useReturn;
export type UseReturnPayLoad = {
    pathStates?: {
        [key: string]: string[];
    };
    isHydrate?: boolean;
    excludeStates?: string[];
    immutable?: boolean;
    renewProps?: boolean;
    shouldComponentUpdate?: (arg0: {
        prev: any;
        nextProps: any;
        nextState: any;
    }) => boolean;
};
export type UseReturnType = (initStates: import('./connectOptions').InitStatesType, store: import("reshow-flux-base").StoreObject<any, any>, payload?: UseReturnPayLoad) => any;
/**
 * @typedef {object} UseReturnPayLoad
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {boolean} [isHydrate]
 * @property {string[]} [excludeStates]
 * @property {boolean} [immutable]
 * @property {boolean} [renewProps]
 * @property {function({prev:any, nextProps:any, nextState:any}):boolean} [shouldComponentUpdate]
 */
/**
 * @callback UseReturnType
 * @param {import('./connectOptions').InitStatesType} initStates
 * @param {import("reshow-flux-base").StoreObject} store
 * @param {UseReturnPayLoad} [payload]
 */
/**
 * @type UseReturnType
 */
declare const useReturn: UseReturnType;
