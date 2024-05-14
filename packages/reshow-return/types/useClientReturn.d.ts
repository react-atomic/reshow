export default useClientReturn;
export type UseReturnType<StateType, ActionType> = import('./useReturn').UseReturnType<StateType, ActionType>;
/**
 * @template StateType
 * @template ActionType
 *
 * @typedef {import('./useReturn').UseReturnType<StateType, ActionType>} UseReturnType
 */
/**
 * @template StateType
 * @template ActionType
 *
 * @type {UseReturnType<StateType, ActionType>}
 */
declare const useClientReturn: UseReturnType<StateType, ActionType>;
