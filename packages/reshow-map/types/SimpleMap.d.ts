export class SimpleMap {
    /**
     * @param {object=} obj
     * @param {boolean=} needUpdate
     */
    constructor(obj?: object | undefined, needUpdate?: boolean | undefined);
    _state: {};
    _update: boolean;
    /**
     * @param {object} obj
     * @returns {SimpleMap}
     */
    renew(obj: object): SimpleMap;
    /**
     * @param {string} k
     * @returns {any}
     */
    get(k: string): any;
    /**
     * @param {(string | number)[]} path
     */
    getIn(path: (string | number)[]): any;
    /**
     * @param {function(any, any=):void} cb
     */
    forEach(cb: (arg0: any, arg1: any | undefined) => void): void;
    /**
     * @param {string} k
     * @param {any} v
     * @returns {SimpleMap}
     */
    set(k: string, v: any): SimpleMap;
    /**
     * @param {string} k
     * @returns {SimpleMap}
     */
    delete(k: string): SimpleMap;
    /**
     * @param {object|SimpleMap} arr
     * @returns {SimpleMap}
     */
    merge(arr: object | SimpleMap): SimpleMap;
    /**
     * @returns {object}
     */
    toJS(): object;
}
