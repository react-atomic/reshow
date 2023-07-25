export default useImmutable;
export type InitStateType<StateType> = import("reshow-flux-base").InitStateType<StateType>;
/**
 * @template StateType
 * @typedef {import("reshow-flux-base").InitStateType<StateType>} InitStateType
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
 * @param {InitStateType<StateType>} [initialState]
 * @returns {[StateMap, import("reshow-flux-base").DispatchType<StateType>]}
 */
declare function useImmutable<StateType>(initialState?: InitStateType<StateType>): [StateMap, import("reshow-flux-base").DispatchType<StateType>];
import { StateMap } from "./ImmutableStore";
