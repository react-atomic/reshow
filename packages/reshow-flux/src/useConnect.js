import "setimmediate";
import { useState, useEffect, useDebugValue } from "react";
import { CHANGE } from "reshow-flux-base";
import { useMounted } from "reshow-hooks";
import { T_TRUE, T_FALSE } from "reshow-constant";

import getStores from "./getStores";

const handleShouldComponentUpdate = ({
  options,
  shouldComponentUpdate,
  calculateState,
  prev,
  props,
}) => {
  const nextState = calculateState(prev.state, props, options);
  const state =
    !shouldComponentUpdate ||
    shouldComponentUpdate({ prev, nextProps: props, nextState })
      ? nextState
      : prev.state;
  return {
    __init__: T_TRUE,
    props,
    state,
  };
};

const useConnect = (options) => (props) => {
  const {
    calculateState,
    shouldComponentUpdate,
    displayName = "useConnect",
  } = options || {};
  useDebugValue(displayName);
  const [data, setData] = useState(() => ({
    props,
    state: calculateState({}, props, options),
  }));

  const isMount = useMounted();

  useEffect(() => {
    const { stores } = getStores({ options, props });
    const storeLen = stores.length;
    if (storeLen) {
      const handleChange = () => {
        if (T_FALSE !== isMount()) {
          setData((prev) =>
            handleShouldComponentUpdate({
              options,
              shouldComponentUpdate,
              calculateState,
              prev,
              props,
            })
          );
        }
      };
      if (!data.__init__ || data.props !== props) {
        handleChange();
      }
      const asyncHandleChange = () => setImmediate(handleChange);
      for (let i = 0; i < storeLen; i++) {
        stores[i].addListener(asyncHandleChange, CHANGE);
      }
      return () => {
        stores.forEach((store) =>
          store?.removeListener(asyncHandleChange, CHANGE)
        );
      };
    }
  }, [props]);

  return data.state || {};
};

export default useConnect;
