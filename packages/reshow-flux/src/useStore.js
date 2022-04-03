import { useSyncExternalStore, useCallback, useRef } from "react";

const useStore = (store, heeding) => {
  const lastEmit = useRef();
  if (!lastEmit.current) {
    lastEmit.current = { state: heeding ? heeding() : store.getState() };
  }
  const subscribe = useCallback(
    (notify) => {
      const myHeeding =
        heeding ||
        ((emit = {}) => {
          emit?.current?.notify();
        });
      const myListener = (state, action, prevState) => {
        lastEmit.current = { state, action, prevState, notify };
        myHeeding(lastEmit);
      };
      store.addListener(myListener);
      return () => store.removeListener(myListener);
    },
    [store, heeding]
  );
  const getState = () => lastEmit.current.state;
  const state = useSyncExternalStore(subscribe, getState, getState);
  return state;
};

export default useStore;
