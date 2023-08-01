export default useReduceStore;
/**
 * useReducer alternative for External store.
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 *
 *
 * ## Base usage
 *
 * const [store, dispatch] = useReduceStore(reduceCallback, initial[Map|Function]);
 *
 * Call dispatch will not trigger re-render.
 *
 *
 * @template StateType
 * @template ActionType
 * @param {import('reshow-flux-base').ReducerType<StateType, ActionType>} reducer
 * @param {import('reshow-flux-base').InitStateType<StateType>} [initialState]
 */
declare function useReduceStore<StateType, ActionType>(reducer: import("reshow-flux-base").ReducerType<StateType, ActionType>, initialState?: import("reshow-flux-base").InitStateType<StateType>): any;
