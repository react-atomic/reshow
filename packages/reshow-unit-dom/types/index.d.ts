export type CallableWrapper = object;
export type SinonSandbox = import("sinon").SinonSandbox;
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
 * @param {string=} html
 * @param {any} [options]
 */
export function jsdom(html?: string | undefined, options?: any): any;
/**
 * @param {boolean|Function} [toThrow]
 */
export function hideConsoleError(toThrow?: boolean | Function): void;
/**
 * @typedef {import("sinon").SinonSandbox} SinonSandbox
 */
/**
 * @see https://sinonjs.org/releases/latest/sandbox/
 * @param {any} [options]
 * @returns {SinonSandbox}
 */
export function getSinon(options?: any): SinonSandbox;
/**
 * @param {function} cb
 * @param {number} delay
 * @returns {Promise<null>}
 */
export function sleep(cb: Function, delay: number): Promise<null>;
