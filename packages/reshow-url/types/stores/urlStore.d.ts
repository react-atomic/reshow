export default store;
declare const store: import("reshow-flux-base").StoreObject<any>;
export const urlDispatch: (action: import("reshow-flux-base/types/createReducer").DispatchAction, actionParams?: import("reshow-flux-base/types/createReducer").Payload) => any;
export class URL {
    constructor(loc: any);
    loc: {};
    getHref(loc: any): any;
    getLocKey(key: any): any;
    get(key: any): any;
}
