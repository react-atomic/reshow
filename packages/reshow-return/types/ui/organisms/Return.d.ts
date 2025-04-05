export default Return;
export type GetReturnOptions = {
    displayName?: string;
    useConnect?: Function;
    cleanProps?: string[];
    options?: object;
};
export type ReturnProps<StateType, ActionType> = {
    store: import("reshow-flux-base").StoreObject<StateType, ActionType>;
    initStates: import("../../connectOptions").InitStatesType;
    pathStates?: {
        [key: string]: string[];
    };
    excludeStates?: string[];
    children?: any;
    backfillProps?: boolean;
};
declare const Return: React.ElementType;
/**
 * @typedef {object} GetReturnOptions
 * @property {string} [displayName]
 * @property {function} [useConnect]
 * @property {string[]} [cleanProps]
 * @property {object} [options]
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} ReturnProps
 * @property {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @property {import("../../connectOptions").InitStatesType} initStates
 * @property {{[key: string]: string[]}} [pathStates]
 * @property {string[]} [excludeStates]
 * @property {import("react").ReactChild} [children]
 * @property {boolean} [backfillProps]
 */
/**
 * @param {GetReturnOptions} props
 * @returns {React.ElementType}
 */
export function getReturn({ displayName, useConnect, cleanProps, options, }?: GetReturnOptions): React.ElementType;
