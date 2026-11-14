/**
 * Check more info
 * https://beta.reactjs.org/learn/you-might-not-need-an-effect?#adjusting-some-state-when-a-prop-changes
 * @param {any} value
 * @param {any} [init]
 * @param {{isLazy?: boolean, onlyDiff?: boolean}} [options]
 * @returns {any}
 */
declare const usePrevious: (value: any, init?: any, options?: {
    isLazy?: boolean;
    onlyDiff?: boolean;
}) => any;
export default usePrevious;
