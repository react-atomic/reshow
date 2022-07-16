import { useSyncExternalStore, useCallback, useRef } from "react";

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
 */

const useStore = (store, heeding) => {
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
  const subscribe = useCallback(
    (notify) => {
      const myHeeding =
        heeding ||
        ((emit) => {
          emit.current.state = emit.current.storeState;
          emit.current.notify();
        });
      const myListener = (storeState, action, prevStoreState) => {
        lastEmit.current = {
          ...lastEmit.current,
          storeState,
          action,
          prevStoreState,
          notify,
        };
        myHeeding(lastEmit);
      };
      store.addListener(myListener);
      return () => store.removeListener(myListener);
    },
    [store, heeding]
  );
  const getState = () => lastEmit.current.state;
  return useSyncExternalStore(subscribe, getState, getState);
};

export default useStore;
