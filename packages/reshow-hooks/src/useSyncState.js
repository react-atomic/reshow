//@ts-check

import { useState, useRef } from "react";
import callfunc from "call-func";

/**
 * @template AnyState
 * @param {any} initState
 * @param {function(function):any[]} [setter]
 * @returns {[AnyState, setSyncState, function():AnyState]}
 */
const useSyncState = (initState, setter = useState) => {
  const lastState = useRef();
  const [state, setState] = setter(() => {
    lastState.current = callfunc(initState);
    return lastState.current;
  });
  /**
   * @param {AnyState} nextState
   */
  const setSyncState = (nextState) => {
    const change = callfunc(nextState, [lastState.current]);
    if (lastState.current !== change) {
      lastState.current = setState(change) || change;
    }
  };
  return [state, setSyncState, () => lastState.current];
};

export default useSyncState;
