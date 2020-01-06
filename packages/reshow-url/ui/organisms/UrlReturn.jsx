import React from 'react';
import build from 'reshow-build';
import {returnOptions} from 'reshow-return';
import {connectHook} from 'reshow-flux';

import urlStore from '../../src/stores/urlStore';

const myReturnOptions = {
  ...returnOptions,
  defaultProps: {
    ...returnOptions.defaultProps,
    stores: [urlStore],
  },
};

const UrlReturn = ({children, ...props}) =>
  build(children)(returnOptions.reset(props));

UrlReturn.displayName = 'UrlReturn';

export default connectHook(UrlReturn, myReturnOptions);
