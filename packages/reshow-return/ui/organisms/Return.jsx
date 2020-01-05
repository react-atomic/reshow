import React from 'react';
import {build} from 'react-atomic-molecule';
import returnOptions from '../../src/ReturnOptions';
import {connectHook} from 'reshow-flux';

const Return = ({
  children,
  immutable,
  initStates,
  pathStates,
  stores,
  storeLocator,
  globalStoreLocator,
  withConstructor,
  ...props
}) => build(children)(props);

Return.displayName = 'Return';
export default connectHook(Return, returnOptions);
export {Return};
