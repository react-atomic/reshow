import React from 'react';
import build from 'reshow-build';
import {connectHook} from 'reshow-flux';

import returnOptions from '../../src/returnOptions';

const Return = ({children, ...props}) =>
  build(children)(returnOptions.reset(props));

Return.displayName = 'Return';
export default connectHook(Return, returnOptions);
export {Return};
