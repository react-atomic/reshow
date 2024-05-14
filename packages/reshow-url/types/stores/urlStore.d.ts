export default myStore;
declare const myStore: {
    registerEvent: (oWin: Window) => void;
    reset: () => any;
    getState: () => any;
    addListener: import("reshow-flux-base/types/type").EmitterAddCall<any, any>;
    removeListener: import("reshow-flux-base/types/type").EmitterRemoveCall<any, any>;
};
export const urlDispatch: import("reshow-flux-base/types/createReducer").DispatchFunction<any, any>;
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
