export function stateKeyLocator(initStates: InitStatesType | null): [InitStatesType extends string[] ? InitStatesType : (keyof InitStateObject)[], (arg0: string) => string];
declare namespace _default {
    export { calculateState };
    export { reset };
}
export default _default;
export type InitStateObject = Record<string, string>;
export type InitStatesType = string[] | InitStateObject;
export type PathStates = {
    [x: string]: string[];
};
export type calculateOptions<StateType, ActionType> = {
    initStates: InitStatesType | null;
    store: import("reshow-flux-base").StoreObject<StateType, ActionType>;
    pathStates?: PathStates | undefined;
    immutable?: boolean | undefined;
};
/**
 * @typedef {Object<string, string[]>} PathStates
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {object} calculateOptions
 * @property {InitStatesType?} initStates
 * @property {import("reshow-flux-base").StoreObject<StateType, ActionType>} store
 * @property {PathStates=} pathStates
 * @property {boolean=} immutable
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @param {StateType} prevState
 * @param {calculateOptions<StateType, ActionType>} calculateOptions
 * @returns {StateType}
 */
declare function calculateState<StateType, ActionType>(prevState: StateType, calculateOptions: calculateOptions<StateType, ActionType>): StateType;
/**
 * @param {object} props
 * @param {object} [more]
 * @returns {object}
 */
declare function reset(props: object, more?: object): object;
