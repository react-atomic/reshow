import { useState, useEffect, useDebugValue } from "react";
import { useMounted } from "reshow-hooks";
import { T_TRUE } from "reshow-constant";
import { CHANGE } from "reshow-flux-base";

import getStore from "./getStore";

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

const useConnect =
  (options = {}) =>
  (props) => {
    const {
      calculateState,
      shouldComponentUpdate,
      displayName = "useConnect",
    } = options;
    useDebugValue(displayName);
    const [data, setData] = useState(() => ({
      props,
      state: calculateState({}, props, options),
    }));

    const isMount = useMounted();

    useEffect(
      () => {
        const { store } = getStore({ options, props });
        const handleChange = () => {
          if (T_TRUE === isMount()) {
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
        store.addListener(handleChange, CHANGE);
        return () => {
          store.removeListener(handleChange, CHANGE);
        };
      },
      props.changeable ? [props] : []
    );

    return data.state || {};
  };

export default useConnect;
