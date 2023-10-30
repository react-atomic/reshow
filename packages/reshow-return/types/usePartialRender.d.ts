export default usePartialRender;
export type DispatchType<StateType, ActionType> = import('reshow-flux-base').DispatchType<StateType, ActionType>;
export type RenderKeysType = string[] | import("immutable").Seq<any, any>;
/**
 * @template StateType
 * @template ActionType
 * @typedef {import('reshow-flux-base').DispatchType<StateType, ActionType>} DispatchType
 */
/**
 * @typedef {string[]|Immutable.Seq} RenderKeysType
 */
/**
 * @template ChildrenType
 * @param {RenderKeysType} [initRenderKeys]
 * @param {{[key: string]: React.ReactElement}|Immutable.Map<string,React.ReactElement>} [initChildren]
 * @returns {[React.ReactElement[], DispatchType<any, ChildrenType>, DispatchType<any, RenderKeysType>]}
 */
declare function usePartialRender<ChildrenType>(initRenderKeys?: RenderKeysType, initChildren?: {
    [key: string]: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
} | Map<string, import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>>): [import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[], DispatchType<any, ChildrenType>, DispatchType<any, RenderKeysType>];
import { Map } from "reshow-flux";
