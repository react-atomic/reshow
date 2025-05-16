export default useReturn;
export type UseReturnPayLoad = {
    pathStates?: {
        [key: string]: string[];
    };
    isHydrate?: boolean;
    immutable?: boolean;
    renewProps?: boolean;
    shouldComponentUpdate?: (arg0: {
        prev: any;
        nextProps: any;
        nextState: any;
    }) => boolean;
};
export type UseReturnType<StateType, ActionType> = (initStates: import("./connectOptions").InitStatesType, store: import("reshow-flux-base").StoreObject<StateType, ActionType>, payload?: UseReturnPayLoad) => StateType;
/**
 * @typedef {object} UseReturnPayLoad
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {boolean} [isHydrate]
 * @property {boolean} [immutable]
 * @property {boolean} [renewProps]
 * @property {function({prev:any, nextProps:any, nextState:any}):boolean} [shouldComponentUpdate]
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @callback UseReturnType
 * @param {import('./connectOptions').InitStatesType} initStates
 * @param {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @param {UseReturnPayLoad} [payload]
 *
 * @returns {StateType}
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @type UseReturnType<StateType, ActionType>
 */
declare const useReturn: UseReturnType<StateType, ActionType>;
