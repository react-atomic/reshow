export default store;
declare const store: any;
export const urlDispatch: (action: string | object | Function, actionParams?: object) => () => URL;
export class URL {
    constructor(loc: any);
    loc: {};
    getHref(loc: any): any;
    getLocKey(key: any): any;
    get(key: any): any;
}
