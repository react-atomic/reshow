export default useStore;
export type Emitter = object;
export type FluxHandler<StateType, ActionType> = import("reshow-flux-base/types/createReducer").FluxHandler<StateType, ActionType>;
export type StoreObject<StateType, ActionType> = import("reshow-flux-base").StoreObject<StateType, ActionType>;
/**
 * @typedef {object} Emitter
 */
/**
 * @template StateType
 * @template ActionType
 * @typedef {import("reshow-flux-base/types/createReducer").FluxHandler<StateType, ActionType>} FluxHandler
 */
/**
 * @template StateType
 * @template ActionType
 * @typedef {import("reshow-flux-base").StoreObject<StateType, ActionType>} StoreObject
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
 * @template ActionType
 * @param {StoreObject<StateType, ActionType>} store
 * @param {function(Emitter):Function} [heeding]
 * @returns {StateType}
 */
declare function useStore<StateType, ActionType>(store: import("reshow-flux-base").StoreObject<StateType, ActionType>, heeding?: (arg0: Emitter) => Function): StateType;
