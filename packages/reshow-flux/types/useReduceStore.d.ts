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
 * @param {import('reshow-flux-base').ReducerType<StateType>} reducer
 * @param {import('reshow-flux-base').InitStateType<StateType>} [initialState]
 */
declare function useReduceStore<StateType>(reducer: import("reshow-flux-base").ReducerType<StateType>, initialState?: import("reshow-flux-base").InitStateType<StateType>): any;
