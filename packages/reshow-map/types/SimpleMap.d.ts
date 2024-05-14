export class SimpleMap {
    /**
     * @param {object} obj
     * @param {boolean} needUpdate
     */
    constructor(obj: object, needUpdate?: boolean);
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
