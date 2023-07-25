export default Return;
export type GetReturnOptions = {
    displayName?: string;
    useConnect?: Function;
    cleanProps?: string[];
    options?: object;
};
export type ReturnProps = {
    store: import("reshow-flux-base").StoreObject<any>;
    initStates: import("../../connectOptions").InitStatesProps;
    children?: import("react").ReactChild;
    backfillProps?: boolean;
};
declare const Return: React.ElementType<any>;
/**
 * @typedef {object} GetReturnOptions
 * @property {string} [displayName]
 * @property {function} [useConnect]
 * @property {string[]} [cleanProps]
 * @property {object} [options]
 */
/**
 * @typedef {object} ReturnProps
 * @property {import("reshow-flux-base").StoreObject} store
 * @property {import("../../connectOptions").InitStatesProps} initStates
 * @property {import("react").ReactChild} [children]
 * @property {boolean} [backfillProps]
 */
/**
 * @param {GetReturnOptions} props
 * @returns {React.ElementType}
 */
export function getReturn({ displayName, useConnect, cleanProps, options, }?: GetReturnOptions): React.ElementType;
import * as React from "react";
