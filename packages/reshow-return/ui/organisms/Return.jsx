import React from 'react';
import {build} from 'react-atomic-molecule';
import {connectHook} from 'reshow-flux';

import returnOptions from '../../src/ReturnOptions';

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
