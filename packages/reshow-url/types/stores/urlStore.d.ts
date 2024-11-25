/**
 * @typedef {import("reshow-flux-base").DispatchFunction<any, any>} DispatchFunction
 */
/**
 * @typedef {import("reshow-flux-base").StoreObject<any, any>&object} StoreObject
 * @property {Function} registerEvent
 */
/**
 * @typedef {object} UrlReducer
 * @property {StoreObject} store
 * @property {DispatchFunction} dispatch
 */
/**
 * @returns {UrlReducer}
 */
export default function getUrlReducer(): UrlReducer;
export class MyURL {
    /**
     * @param {Location=} loc
     */
    constructor(loc?: Location | undefined);
    loc: {};
    getHref(): any;
    /**
     * @param {string} key
     * @returns {string}
     */
    getLocKey(key: string): string;
    /**
     * @param {string} key
     */
    get(key: string): any;
}
export type DispatchFunction = import("reshow-flux-base").DispatchFunction<any, any>;
export type StoreObject = import("reshow-flux-base").StoreObject<any, any> & object;
export type UrlReducer = {
    store: StoreObject;
    dispatch: DispatchFunction;
};
