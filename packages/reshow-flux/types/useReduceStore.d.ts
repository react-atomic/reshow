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
 */
declare function useReduceStore(reduce: any, initialState: any): undefined;
