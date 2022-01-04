import "setimmediate";
import { useState, useEffect, useDebugValue } from "react";
import { useMounted } from "reshow-hooks";
import { T_TRUE, T_FALSE } from "reshow-constant";
import { CHANGE } from "reshow-flux-base";

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

const useConnect =
  (options = {}) =>
  (props) => {
    const {
      calculateState,
      shouldComponentUpdate,
      displayName = "useConnect",
      immutable,
    } = options;
    useDebugValue(displayName);
    const [data, setData] = useState(() => ({
      props,
      state: calculateState({}, props, options),
    }));

    const isMount = useMounted();

    useEffect(
      () => {
        const { allProps, firstStore } = getStores({ options, props });
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
        firstStore.addListener(handleChange, CHANGE);
        return () => {
          firstStore.removeListener(handleChange, CHANGE);
        };
      },
      immutable ? [] : [props]
    );

    return data.state || {};
  };

export default useConnect;
