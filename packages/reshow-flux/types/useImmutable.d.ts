export default useImmutable;
export type InitStateMap<StateType> = import("./ImmutableStore").InitStateMap<StateType>;
/**
 * @template StateType
 * @typedef {import("./ImmutableStore").InitStateMap<StateType>} InitStateMap
 */
/**
 * useState alternative but implement by Immutable.
 * https://reactjs.org/docs/hooks-reference.html#usestate
 *
 *
 * ## Base usage
 * const [state, setState] = useImmutable(initialState);
 *
 * call setState will trigger re-render.
 * could use setState for partial update.
 *
 * @template StateType
 * @param {InitStateMap<StateType>} [initialState]
 */
declare function useImmutable<StateType>(initialState?: any): any[];
