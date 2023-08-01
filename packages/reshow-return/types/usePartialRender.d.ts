export default usePartialRender;
export type DispatchType<StateType, ActionType> = import('reshow-flux-base').DispatchType<StateType, ActionType>;
/**
 * @template StateType
 * @template ActionType
 * @typedef {import('reshow-flux-base').DispatchType<StateType, ActionType>} DispatchType
 */
/**
 * @template ChildrenType
 * @param {string[]|Immutable.Seq} [initRenderKeys]
 * @param {{[key: string]: React.ReactElement}|Immutable.Map<string,React.ReactElement>} [initChildren]
 * @returns {[React.ReactElement[], DispatchType<any, ChildrenType>, DispatchType<any, string[]>]}
 */
declare function usePartialRender<ChildrenType>(initRenderKeys?: string[] | import("immutable").Seq<any, any>, initChildren?: {
    [key: string]: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
} | Map<string, import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>>): [import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[], DispatchType<any, ChildrenType>, DispatchType<any, string[]>];
import { Map } from "reshow-flux";
