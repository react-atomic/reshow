export default build;
export { mergeRef } from "./mergeRef";
export type Component = React.ComponentType | React.ReactNode | Function;
export type RefType = import('./mergeRef').RefType;
export type BuildProps = object;
export type ComponentOption = {
    wrap?: Component;
    doCallFunction?: boolean;
};
/**
 * @param {Component} [component]
 * @param {ComponentOption} componentOption
 */
declare function build(component?: Component, componentOption?: ComponentOption): (props?: BuildProps, child?: Component) => React.ReactElement | null;
import * as React from "react";
