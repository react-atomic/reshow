export default useImmutable;
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
 * @param {import("reshow-flux-base").InitStateType<StateType>} [initialState]
 */
declare function useImmutable<StateType>(initialState?: import("reshow-flux-base").InitStateType<StateType>): any[];
