import { useState, useEffect } from "react";

const useStore = (store) => {
  const [state, setState] = useState(() => store.getState());
  useEffect(() => {
    store.addListener(setState);
    return () => {
      store.removeListener(setState);
    };
  }, []);
  return state;
};

export default useStore;
