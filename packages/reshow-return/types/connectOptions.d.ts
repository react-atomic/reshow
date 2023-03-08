export default connectOptions;
declare namespace connectOptions {
    export { calculateState };
    export { reset };
}
/**
 * @param {any[]|object} initStates
 * @returns {[any[], function(string):any]}
 */
export function stateKeyLocator(initStates: any[] | object): [any[], (arg0: string) => any];
/**
 * @param {any} prevState
 * @param {any} options
 * @returns {any}
 */
declare function calculateState(prevState: any, options: any): any;
/**
 * @param {object} props
 * @param {object} [more]
 * @returns {object}
 */
declare function reset(props: object, more?: object): object;
