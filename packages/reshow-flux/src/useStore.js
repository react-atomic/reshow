// @ts-check

import { useSyncExternalStore, useRef } from "react";

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
 * @param {function(Emitter):any} [heeding]
 * @returns {StateType}
 */
const useStore = (store, heeding) => {
  /**
   * @type any
   */
  const lastProps = useRef();
  lastProps.current = { store, heeding };
  /**
   * @type any
   */
  const lastEmit = useRef();
  if (!lastEmit.current) {
    lastEmit.current = {
      /**
       * Pass empty {} to heeding, that easy use
       * if(!emit.current){return initState;}
       * inside heeding.
       */
      state: heeding ? heeding({}) : store.getState(),
    };
  }
  const subscribe = (/** @type function*/ notify) => {
    const { store, heeding } = lastProps.current;
    const myHeeding =
      heeding ||
      ((/** @type Emitter*/ emit) => {
        emit.current.state = emit.current.storeState;
        emit.current.notify();
        return emit.current.state;
      });
    /**
     * @type FluxHandler<StateType, ActionType>
     */
    const myListener = (storeState, action, prevStoreState) => {
      lastEmit.current = {
        ...lastEmit.current,
        storeState,
        action,
        prevStoreState,
        notify,
      };
      return myHeeding(lastEmit);
    };
    store.addListener(myListener);
    return () => store.removeListener(myListener);
  };
  const getState = () => lastEmit.current.state;
  return useSyncExternalStore(subscribe, getState, getState);
};

export default useStore;
