export default build;
export type Component = any;
declare function build(component: Component, componentOption?: object): (props?: object, child?: Component) => React.ReactElement | React.ReactElement[];
