export default Return;
export type GetReturnOptions = {
    displayName?: string;
    useConnect?: Function;
    cleanProps?: string[];
    options?: object;
};
export type ReturnProps = {
    store: string;
    initStates: import("../../connectOptions").InitStatesProps;
    children: import("react").ReactChild;
    backfillProps: boolean;
};
/**
 * @param {ReturnProps} props
 */
declare function Return(props: ReturnProps): JSX.Element;
declare namespace Return {
    export { displayName };
}
/**
 * @typedef {object} GetReturnOptions
 * @property {string} [displayName]
 * @property {function} [useConnect]
 * @property {string[]} [cleanProps]
 * @property {object} [options]
 */
/**
 * @typedef {object} ReturnProps
 * @property {string} store
 * @property {import("../../connectOptions").InitStatesProps} initStates
 * @property {import("react").ReactChild} children
 * @property {boolean} backfillProps
 */
/**
 * @param {GetReturnOptions} props
 */
export function getReturn({ displayName, useConnect, cleanProps, options, }?: GetReturnOptions): {
    (props: ReturnProps): JSX.Element;
    displayName: string;
};
