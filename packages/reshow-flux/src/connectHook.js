import {useMemo, useState, useEffect} from 'react';
import build from 'reshow-build';
import callfunc from 'call-func';
import dedup from 'array.dedup';
import {CHANGE} from 'reshow-flux-base';

const connectHook = (Base, options) => {
  const {calculateState, defaultProps, getStores} = options || {};
  const arrState = {};
  const Connected = props => {
    const [data, setData] = useState(() => calculateState({}, props));
    useEffect(() => {
      const stores = dedup(getStores(props)) || [];
      const handleChange = () => {
        setData(prevState => ({
          ...prevState,
          ...calculateState(prevState, props),
        }));
      };
      if (stores && stores.length) {
        stores.forEach(store => store.addListener(handleChange, CHANGE));
        return () => {
          stores.forEach(store => store.removeListener(handleChange, CHANGE));
        };
      }
    });
    return useMemo(() => build(Base)({...props, ...data}), [props, data]);
  };
  const componentName = Base.displayName || Base.name;
  Connected.displayName = 'HookConnected(' + componentName + ')';
  if (defaultProps) {
    Connected.defaultProps = defaultProps;
  }
  return Connected;
};

export default connectHook;
