export default useReturn;
export type calculateOptions<StateType, ActionType> = import("./connectOptions").calculateOptions<StateType, ActionType>;
export type UseReturnPayLoad = {
    pathStates?: {
        [key: string]: string[];
    };
    immutable?: boolean;
    renewProps?: boolean;
    shouldComponentUpdate?: (arg0: {
        prev: any;
        nextProps: any;
        nextState: any;
    }) => boolean;
};
export type UseReturnType<StateType, ActionType> = (initStates: import("./connectOptions").InitStatesType | null, store: import("reshow-flux-base").StoreObject<StateType, ActionType>, payload?: UseReturnPayLoad) => StateType;
/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import("./connectOptions").calculateOptions<StateType, ActionType>} calculateOptions
 */
/**
 * @typedef {object} UseReturnPayLoad
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {boolean} [immutable]
 * @property {boolean} [renewProps]
 * @property {function({prev:any, nextProps:any, nextState:any}):boolean} [shouldComponentUpdate]
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @callback UseReturnType
 * @param {import('./connectOptions').InitStatesType?} initStates
 * @param {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @param {UseReturnPayLoad} [payload]
 *
 * @returns {StateType}
 */
/**
 * @type UseReturnType<any, any>
 */
declare const useReturn: UseReturnType<any, any>;
