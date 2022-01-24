import { useState, useEffect } from "react";

const useStore = (store, heeding) => {
  const [state, setState] = useState(() =>
    heeding ? heeding()() : store.getState()
  );
  useEffect(() => {
    heeding =
      heeding || ((setState) => (state, action, prevState) => setState(state));
    const handler = heeding(setState);
    store.addListener(handler);
    return () => {
      store.removeListener(handler);
    };
  }, []);
  return state;
};

export default useStore;
