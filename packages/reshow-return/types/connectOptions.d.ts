export default connectOptions;
export type InitStatesProps = any[] | object;
declare namespace connectOptions {
    export { calculateState };
    export { reset };
}
/**
 * @param {InitStatesProps} initStates
 * @returns {[any[], function(string):any]}
 */
export function stateKeyLocator(initStates: InitStatesProps): [any[], (arg0: string) => any];
/**
 * @param {any} prevState
 * @param {any} options
 * @returns {any}
 */
declare function calculateState(prevState: any, options: any): any;
/**
 * @typedef {any[]|object} InitStatesProps
 */
/**
 * @param {object} props
 * @param {object} [more]
 * @returns {object}
 */
declare function reset(props: object, more?: object): object;
