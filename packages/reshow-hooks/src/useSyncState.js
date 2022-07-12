import { useState, useRef } from "react";
import callfunc from "call-func";

const useSyncState = (initState, setter = useState) => {
  const lastState = useRef();
  const [state, setState] = setter(() => {
    const thisInitState = callfunc(initState);
    lastState.current = thisInitState;
    return thisInitState;
  });
  const setSyncState = (nextState) => {
    lastState.current = callfunc(nextState, [lastState.current]);
    setState(lastState.current);
  };
  return [state, setSyncState, ()=>lastState.current];
};

export default useSyncState;
