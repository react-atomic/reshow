//@ts-check

import * as React from "react";
const { useState, useRef } = React;
import callfunc from "call-func";

/**
 * @template AnyState
 * @param {any} initState
 * @param {(init: () => any) => [any, function]} [setter]
 * @returns {[AnyState, (nextState: AnyState) => void, () => AnyState|undefined|null]}
 */
const useSyncState = (initState, setter = useState) => {
  /**
   * @type {React.MutableRefObject<AnyState|undefined>}
   */
  const lastState = useRef(undefined);
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
