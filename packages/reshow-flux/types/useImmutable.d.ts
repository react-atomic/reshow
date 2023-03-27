export default useImmutable;
export type InitStateWithMap<StateType> = import("./ImmutableStore").InitStateWithMap<StateType>;
/**
 * @template StateType
 * @typedef {import("./ImmutableStore").InitStateWithMap<StateType>} InitStateWithMap
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
 * @param {InitStateWithMap<StateType>} [initialState]
 */
declare function useImmutable<StateType>(initialState?: any): any[];
