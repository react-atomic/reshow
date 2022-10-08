export default build;
export type Component = any;
/**
 * @param {Component} component
 * @param {object} componentOption
 */
declare function build(component: Component, componentOption?: object): (props?: object, child?: Component) => React.ReactElement;
