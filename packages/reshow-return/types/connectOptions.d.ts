export function stateKeyLocator(initStates: InitStatesType): [InitStatesType extends string[] ? InitStatesType : (keyof InitStateObject)[], (arg0: string) => string];
declare namespace _default {
    export { calculateState };
    export { reset };
}
export default _default;
export type InitStateObject = Record<string, string>;
export type StateObject = Record<string, any>;
export type InitStatesType = string[] | InitStateObject;
export type PathStates = {
    [x: string]: string[];
};
export type calculateOptions = {
    initStates: InitStatesType;
    store: StoreObject<any, any>;
    pathStates?: PathStates | undefined;
    excludeStates?: string[] | undefined;
    immutable?: boolean | undefined;
};
/**
 * @typedef {Object<string, string[]>} PathStates
 */
/**
 * @typedef {object} calculateOptions
 * @property {InitStatesType} initStates
 * @property {StoreObject} store
 * @property {PathStates=} pathStates
 * @property {string[]=} excludeStates
 * @property {boolean=} immutable
 */
/**
 * @param {StateObject} prevState
 * @param {calculateOptions} calculateOptions
 * @returns {StateObject}
 */
declare function calculateState(prevState: StateObject, calculateOptions: calculateOptions): StateObject;
/**
 * @param {object} props
 * @param {object} [more]
 * @returns {object}
 */
declare function reset(props: object, more?: object): object;
import { StoreObject } from "reshow-flux-base";
