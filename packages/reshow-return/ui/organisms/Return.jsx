import React, {useMemo} from 'react';
import {build} from 'react-atomic-molecule';
import returnOptions from '../../src/ReturnOptions';
import {connectHook} from 'reshow-flux';

const Return = props => {
  const {
    children,
    immutable,
    initStates,
    pathStates,
    stores,
    storeLocator,
    globalStoreLocator,
    withConstructor,
    ...otherProps
  } = props;
  return useMemo(() => build(children)(otherProps), [children, otherProps]);
};

Return.displayName = 'Return';
export default connectHook(Return, returnOptions);
export {Return};
