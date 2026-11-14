export type CallableWrapper<T> = {
    current?: T | null;
};
/**
 * @param {string=} html
 * @param {any} [options]
 */
declare const jsdom: (html?: string | undefined, options?: any) => () => void;
/**
 * @param {boolean|Function} [toThrow]
 */
declare const hideConsoleError: (toThrow?: boolean | Function) => void;
/**
 * @param {boolean|Function} [toThrow]
 */
declare const hideConsoleWarn: (toThrow?: boolean | Function) => void;
export type SinonSandbox = import("sinon").SinonSandbox;
/**
 * @typedef {import("sinon").SinonSandbox} SinonSandbox
 */
/**
 * @see https://sinonjs.org/releases/latest/sandbox/
 * @param {any} [options]
 * @returns {SinonSandbox}
 */
declare const getSinon: (options?: any) => SinonSandbox;
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
declare const cleanIt: (props?: CleanItProps) => void;
/**
 * @param {function} cb
 * @param {number} delay
 * @returns {Promise<null>}
 */
declare const sleep: (cb: Function, delay: number) => Promise<null>;
export { cleanIt, jsdom, hideConsoleError, hideConsoleWarn, getSinon, sleep };
