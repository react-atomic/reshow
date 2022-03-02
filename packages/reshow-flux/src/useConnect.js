import { useState, useEffect, useDebugValue } from "react";
import { useMounted } from "reshow-hooks";
import { T_TRUE } from "reshow-constant";

import getStore from "./getStore";

const handleShouldComponentUpdate = ({
  options,
  shouldComponentUpdate,
  calculateState,
  prev,
  props,
}) => {
  const nextState = calculateState(prev.state, options);
  const bUpdate =
    !shouldComponentUpdate ||
    shouldComponentUpdate({ prev, nextProps: props, nextState });

  if (!bUpdate || (props === prev.props && nextState === prev.state)) {
    prev.__init__ = T_TRUE;
    return prev;
  } else {
    return {
      props,
      __init__: T_TRUE,
      state: nextState,
    };
  }
};

const useConnect =
  (inputOptions = {}) =>
  (props) => {
    const options = getStore({ options: inputOptions, props });
    const {
      calculateState,
      shouldComponentUpdate,
      displayName = "useConnect",
    } = options;
    useDebugValue(displayName);
    const [data, setData] = useState(() => ({
      props,
      state: calculateState({}, options),
    }));

    const isMount = useMounted();

    useEffect(
      () => {
        const handleChange = (storeSyncState) => {
          if (T_TRUE === isMount()) {
            /**
             * Why storeSyncState?
             *
             * It's useful for synchronous programing to get correct data,
             * when it pass from reducer directly.
             */
            options.storeSyncState = storeSyncState;
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
          handleChange(options.store.getState());
        }
        options.store.addListener(handleChange);
        return () => {
          options.store.removeListener(handleChange);
        };
      },
      props.renewProps ? [props] : []
    );

    return data.state || {};
  };

export default useConnect;
