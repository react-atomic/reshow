export default useImmutable;
export type ActionObject = import("reshow-flux-base").ActionObject;
export type InitStateType<StateType> = import("reshow-flux-base").InitStateType<StateType>;
/**
 * @typedef {import("reshow-flux-base").ActionObject} ActionObject
 */
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
 * @template [StateType=StateMap]
 * @param {InitStateType<StateType>} [initialState]
 * @returns {[StateMap, import("reshow-flux-base").DispatchFunction<StateMap, ActionObject>]}
 */
declare function useImmutable<StateType = StateMap>(initialState?: InitStateType<StateType>): [StateMap, import("reshow-flux-base").DispatchFunction<StateMap, ActionObject>];
import { StateMap } from "./ImmutableStore";
