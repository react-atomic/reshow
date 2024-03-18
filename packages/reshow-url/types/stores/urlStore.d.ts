export default store;
declare const store: import("reshow-flux-base").StoreObject<any, any>;
export const urlDispatch: import("reshow-flux-base/types/createReducer").DispatchFunction<any, any>;
export class URL {
    constructor(loc: any);
    loc: {};
    getHref(_loc: any): any;
    getLocKey(key: any): any;
    get(key: any): any;
}
