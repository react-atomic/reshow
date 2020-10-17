import "setimmediate";
import { useState, useEffect, useRef } from "react";
import build from "reshow-build";
import dedup from "array.dedup";
import { CHANGE } from "reshow-flux-base";

const keys = Object.keys;

const cleanKeys = (props, state) => {
  if (state) {
    keys(props || {}).forEach((key) => delete state[key]);
    return state;
  }
};

const connectHook = (Base, options) => {
  const { getStores, calculateState, defaultProps, displayName } =
    options || {};
  const Connected = (props) => {
    const [data, setData] = useState(() => ({
      state: calculateState({}, props),
      props,
    }));

    const _mount = useRef(true);

    useEffect(() => {
      const stores = dedup(getStores(props)) || [];
      if (stores && stores.length) {
        const handleChange = () => {
          if (_mount.current) {
            setData((prev) => ({
              __init__: true,
              props,
              state: {
                ...cleanKeys(prev.props, prev.state),
                ...props,
                ...calculateState(prev.state, props),
              },
            }));
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

    return build(Base)(data.state);
  };
  const componentName = displayName || Base.displayName || Base.name;
  Connected.displayName = "HookConnected(" + componentName + ")";
  if (defaultProps) {
    Connected.defaultProps = defaultProps;
  }
  return Connected;
};

export default connectHook;
