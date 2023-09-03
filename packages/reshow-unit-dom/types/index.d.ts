export type CallableWrapper = object;
export type CleanItProps = {
    debug?: any;
};
/**
 * @typedef {object} CleanItProps
 * @property {any} [debug]
 */
/**
 * @param {CleanItProps} [props]
 */
export function cleanIt(props?: CleanItProps): void;
/**
 * @param {string} html
 * @param {any} [options]
 */
export function jsdom(html: string, options?: any): any;
/**
 * @param {boolean|Function} [toThrow]
 */
export function hideConsoleError(toThrow?: boolean | Function): void;
/**
 * @see https://sinonjs.org/releases/latest/sandbox/
 * @param {any} [options]
 */
export function getSinon(options?: any): any;
/**
 * @param {function} cb
 * @param {number} delay
 * @returns {Promise}
 */
export function sleep(cb: Function, delay: number): Promise<any>;
