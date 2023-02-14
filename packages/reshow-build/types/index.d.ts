export default build;
export { mergeRef } from "./mergeRef";
export type Component = any;
export type PropsWithKey = React.PropsWithChildren & {
    key?: string;
};
export type ComponentOption = {
    wrap?: React.ReactElement;
    doCallFunction?: boolean;
};
/**
 * @param {Component} component
 * @param {ComponentOption} componentOption
 */
declare function build(component: Component, componentOption?: ComponentOption): (props?: PropsWithKey, child?: Component) => React.ReactElement;
