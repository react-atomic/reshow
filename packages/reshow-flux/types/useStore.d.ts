export default useStore;
export type Emitter = object;
export type FluxHandler = import("reshow-flux-base/types/createReducer").FluxHandler;
/**
 * @typedef {object} Emitter
 */
/**
 * @typedef {import("reshow-flux-base/types/createReducer").FluxHandler} FluxHandler
 */
/**
 * How to use?
 *
 *  import { useEffect } from "react";
 *  import { useStore, ImmutableStore } from "reshow-flux";
 *  const [store, dispatch] = ImmutableStore();
 *  const Comp = props => {
 *    const state = useStore(store);
 *    useEffect(()=>dispatch({foo: "bar"}), []);
 *    return <div>{state.get("foo")}</div>;
 *  }
 *
 * @template StateType
 * @param {import("reshow-flux-base/types/createReducer").StoreObject<StateType>} store
 * @param {function(Emitter):Function} [heeding]
 */
declare function useStore<StateType>(store: import("reshow-flux-base/types/createReducer").StoreObject<StateType>, heeding?: (arg0: Emitter) => Function): any;
