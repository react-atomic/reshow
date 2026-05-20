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
 * React 19 / RSC compatibility: any object carrying a React `$$typeof` tag —
 * elements, lazy refs, forward_ref/memo refs, etc. — should pass through
 * `build()` untouched in the no-props / no-child path. Wrapping such a value
 * as the *type* argument to `createElement` corrupts the render tree:
 *   - Next.js ships server children as `React.lazy` refs that resolve to a
 *     React element. Rendered directly as a child (`{lazyRef}`) React resolves
 *     them correctly; rendered as a *type* (`createElement(lazyRef, {})`) the
 *     resolved value lands in the renderer's type position and throws
 *     "Element type is invalid … got: object".
 *   - Element-shaped objects with foreign `$$typeof` symbols (cross-realm RSC)
 *     have the same risk.
 *
 * @param {any} x
 * @returns {boolean}
 */
export function isElementLike(x: any): boolean;
import * as React from "react";
