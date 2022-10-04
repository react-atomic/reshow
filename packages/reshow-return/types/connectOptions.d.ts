export default connectOptions;
declare namespace connectOptions {
    export { calculateState };
    export { reset };
}
export function stateKeyLocator(initStates: any): (any[] | ((key: any) => any))[];
declare function calculateState(prevState: any, options: any): any;
declare function reset(props: any, more: any): any;
