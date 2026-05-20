export default build;
export { mergeRef } from "./mergeRef";
export type Component = React.ComponentType | React.ReactNode | Function;
export type RefType = import("./mergeRef").RefType;
export type BuildProps = object;
export type ComponentOption = {
    /**
     * This will only be used when the original component is not a valid element.
     */
    altWrap?: Component;
    doCallFunction?: boolean | undefined;
};
/**
 * @param {Component|Component[]} [component]
 * @param {ComponentOption} componentOption
 */
declare function build(component?: Component | Component[], componentOption?: ComponentOption): (props?: BuildProps, child?: Component | Component[]) => React.ReactElement | null;
/**
 * React 19 / RSC compatibility: an element shipped across the server/client
 * boundary may not satisfy `isValidElement` (different `$$typeof` symbol
 * resolution between React instances), yet it is structurally a React element.
 * Treat any object carrying `$$typeof` and `type` as element-like so we never
 * pass it as the *type* argument to `createElement`.
 *
 * @param {any} x
 * @returns {boolean}
 */
export function isElementLike(x: any): boolean;
import * as React from "react";
