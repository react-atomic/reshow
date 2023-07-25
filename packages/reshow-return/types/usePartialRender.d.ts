export default usePartialRender;
export type DispatchType<StateType> = import('reshow-flux-base').DispatchType<StateType>;
/**
 * @template StateType
 * @typedef {import('reshow-flux-base').DispatchType<StateType>} DispatchType
 */
/**
 * @template ChildrenType
 * @param {string[]} [initRenderKeys]
 * @param {{[key: string]: React.ReactElement}} [initChildren]
 * @returns {[React.ReactElement[], DispatchType<ChildrenType>, DispatchType<any>]}
 */
declare function usePartialRender<ChildrenType>(initRenderKeys?: string[], initChildren?: {
    [key: string]: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}): [import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[], DispatchType<ChildrenType>, DispatchType<any>];
