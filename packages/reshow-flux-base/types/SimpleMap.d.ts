export default SimpleMap;
declare class SimpleMap {
    constructor(obj: any, needUpdate: any);
    _state: {};
    _update: boolean;
    renew(state: any): SimpleMap;
    get(k: any): any;
    set(k: any, v: any): SimpleMap;
    delete(k: any): SimpleMap;
    merge(arr: any): SimpleMap;
    toJS(): {};
}
