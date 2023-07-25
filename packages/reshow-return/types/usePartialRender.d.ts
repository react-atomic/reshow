export default usePartialRender;
export type DispatchType<StateType> = import('reshow-flux-base').DispatchType<StateType>;
/**
 * @template StateType
 * @typedef {import('reshow-flux-base').DispatchType<StateType>} DispatchType
 */
/**
 * @template ChildrenType
 * @param {string[]|Immutable.Seq} [initRenderKeys]
 * @param {{[key: string]: React.ReactElement}|Immutable.Map<string,React.ReactElement>} [initChildren]
 * @returns {[React.ReactElement[], DispatchType<ChildrenType>, DispatchType<any>]}
 */
declare function usePartialRender<ChildrenType>(initRenderKeys?: string[] | import("immutable").Seq<any, any>, initChildren?: {
    [key: string]: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
} | Map<string, import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>>): [import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[], DispatchType<ChildrenType>, DispatchType<any>];
import { Map } from "reshow-flux";
