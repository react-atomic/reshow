import { useState, useRef } from "react";
import callfunc from "call-func";

const useSyncState = (initState, setter = useState) => {
  const lastState = useRef();
  const [state, setState] = setter(() => {
    lastState.current = callfunc(initState);
    return lastState.current;
  });
  const setSyncState = (nextState) => {
    const change = callfunc(nextState, [lastState.current]);
    if (lastState.current !== change) {
      lastState.current = change;
      setState(lastState.current);
    }
  };
  return [state, setSyncState, () => lastState.current];
};

export default useSyncState;
