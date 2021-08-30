import "setimmediate";
import { useState, useEffect } from "react";
import dedup from "array.dedup";
import { CHANGE } from "reshow-flux-base";
import { useMounted } from "reshow-hooks"; 

import getStores from "./getStores";

const handleShouldComponentUpdate = ({
  shouldComponentUpdate,
  calculateState,
  prev,
  props,
}) => {
  const state =
    !shouldComponentUpdate || shouldComponentUpdate({ prev, props })
      ? calculateState(prev.state, props)
      : prev.state;
  return {
    __init__: true,
    props,
    state,
  };
};

const useConnect = (options) => (props) => {
  const { calculateState, shouldComponentUpdate } = options || {};
  const [data, setData] = useState(() => ({
    props,
    state: calculateState({}, props),
  }));

  const [lastProps, setLastProps] = useState(props);

  const isMount = useMounted();

  useEffect(() => {
    if (props.withPropsChange) {
      setLastProps(props);
    }
  }, [props]);

  useEffect(() => {
    const stores = dedup(getStores(lastProps)) || [];
    if (stores && stores.length) {
      const handleChange = () => {
        if (false !== isMount()) {
          setData((prev) =>
            handleShouldComponentUpdate({
              shouldComponentUpdate,
              calculateState,
              prev,
              props: lastProps,
            })
          );
        }
      };
      const asyncHandleChange = () => setImmediate(handleChange);
      if (!data.__init__ || data.props !== lastProps) {
        handleChange();
      }
      stores.forEach((store) => store?.addListener(asyncHandleChange, CHANGE));
      return () => {
        stores.forEach((store) =>
          store?.removeListener(asyncHandleChange, CHANGE)
        );
      };
    }
  }, [lastProps]);

  return data.state || {};
};

export default useConnect;
