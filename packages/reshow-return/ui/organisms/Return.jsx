import React from 'react';
import {build} from 'react-atomic-molecule';
import {connectHook} from 'reshow-flux';

import returnOptions from '../../src/ReturnOptions';

const Return = ({children, ...props}) =>
  build(children)(returnOptions.reset(props));

Return.displayName = 'Return';
export default connectHook(Return, returnOptions);
export {Return};
