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
    doCallFunction?: boolean;
};
/**
 * @param {Component|Component[]} [component]
 * @param {ComponentOption} componentOption
 */
declare function build(component?: Component | Component[], componentOption?: ComponentOption): (props?: BuildProps, child?: Component | Component[]) => React.ReactElement | null;
