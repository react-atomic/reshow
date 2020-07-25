import 'setimmediate';
import { useMemo, useState, useEffect } from "react";
import build from "reshow-build";
import dedup from "array.dedup";
import { CHANGE } from "reshow-flux-base";

const keys = Object.keys;

const cleanKeys = (props, state) => {
  if (state) {
    keys(props || {}).forEach(key => delete state[key]);
    return state;
  }
};

const connectHook = (Base, options) => {
  const { getStores, calculateState, defaultProps, displayName } =
    options || {};
  const Connected = props => {
    const [data, setData] = useState(() => ({
      state: calculateState({}, props),
      props
    }));
    useEffect(() => {
      const stores = dedup(getStores(props)) || [];
      if (stores && stores.length) {
        let __unmount__;
        const handleChange = () => {
          if (!__unmount__) {
            setData(prev => ({
              __init__: true,
              props,
              state: {
                ...cleanKeys(prev.props, prev.state),
                ...props,
                ...calculateState(prev.state, props)
              }
            }));
          }
        };
        const handleChangeEvent = () => setImmediate(() => handleChange());
        stores.forEach(store => store.addListener(handleChangeEvent, CHANGE));
        if (!data.__init__ || data.props !== props) {
          handleChange();
        }
        return () => {
          __unmount__ = true;
          stores.forEach(store => store.removeListener(handleChange, CHANGE));
        };
      }
    }, [props]);
    return useMemo(() => build(Base)(data.state), [data.state]);
  };
  const componentName = displayName || Base.displayName || Base.name;
  Connected.displayName = "HookConnected(" + componentName + ")";
  if (defaultProps) {
    Connected.defaultProps = defaultProps;
  }
  return Connected;
};

export default connectHook;
