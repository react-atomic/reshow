import "setimmediate";
import { useState, useEffect, useRef } from "react";
import dedup from "array.dedup";
import { CHANGE } from "reshow-flux-base";

import getStores from "./getStores";

const keys = Object.keys;

const handleShouldComponentUpdate = ({
  shouldComponentUpdate,
  calculateState,
  prev,
  props,
}) => {
  if (!shouldComponentUpdate || shouldComponentUpdate({ prev, props })) {
    return {
      __init__: true,
      props,
      state: calculateState(prev.state, props),
    };
  } else {
    return prev;
  }
};

const useConnect = (options) => (props) => {
  const { calculateState, shouldComponentUpdate } = options || {};
  const [data, setData] = useState(() => ({
    props,
    state: calculateState({}, props),
  }));

  const _mount = useRef(true);
  const _props = useRef();

  useEffect(() => {
    const stores = dedup(getStores(props)) || [];
    _props.current = props;
    if (stores && stores.length) {
      const handleChange = () => {
        if (_mount.current) {
          setData((prev) =>
            handleShouldComponentUpdate({
              shouldComponentUpdate,
              calculateState,
              prev,
              props: _props.current, // prevent get outdated props
            })
          );
        }
      };
      const asyncHandleChange = () => setImmediate(handleChange);
      if (!data.__init__ || data.props !== props) {
        handleChange();
      }
      stores.forEach((store) => store.addListener(asyncHandleChange, CHANGE));
      return () => {
        stores.forEach((store) =>
          store.removeListener(asyncHandleChange, CHANGE)
        );
      };
    }
  }, [props]);

  useEffect(() => () => (_mount.current = false), []);
  return data.state || {};
};

export default useConnect;
