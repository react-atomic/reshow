export declare class MyURL {
    /** @type {Record<string, any>} */
    loc: Record<string, any>;
    /**
     * @param {Location=} loc
     */
    constructor(loc?: Location | undefined);
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
export type StoreObject = import("reshow-flux-base").StoreObject<any, any> & {
    registerEvent: Function;
};
export type UrlReducer = {
    store: StoreObject;
    dispatch: DispatchFunction;
};
/**
 * @typedef {import("reshow-flux-base").DispatchFunction<any, any>} DispatchFunction
 */
/**
 * @typedef {import("reshow-flux-base").StoreObject<any, any>&{registerEvent: Function}} StoreObject
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
