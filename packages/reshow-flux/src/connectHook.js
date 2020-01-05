import {useMemo, useState, useReducer, useLayoutEffect} from 'react';
import build from 'reshow-build';
import callfunc from 'call-func';
import dedup from 'array.dedup';
import {CHANGE} from 'reshow-flux-base';

const setStores = (state, stores, handleChange, dispatch) => {
  if (state && state.stores) {
    resetStores(state);
  }
  if (stores && stores.length) {
    stores = dedup(stores) || [];
    stores.forEach(store => store.addListener(handleChange, CHANGE));
  }
  dispatch({stores, handleChange});
};

const resetStores = state => {
  const {stores, handleChange} = state || {};
  if (!stores || !stores.length) {
    return;
  }
  stores.forEach(store => store.removeListener(handleChange, CHANGE));
};

const reducer = (state, action) => {
  state = state || {};
  state.stores = action.stores;
  state.handleChange = action.handleChange;
  return state;
};

const connectHook = (Base, options) => {
  const {calculateState, defaultProps, getStores} = options || {};
  const arrState = {};
  const Connected = props => {
    const [state, dispatch] = useReducer(reducer);
    const [data, setData] = useState(calculateState({}, props));
    useLayoutEffect(() => {
      const handleChange = () => setData(calculateState(data, props));
      setStores(state, getStores(props), handleChange, dispatch);
      return () => {
        resetStores(state);
      };
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
