import React from 'react';
import Return from 'reshow-return';
import urlStore from '../../src/stores/urlStore';

class UrlReturn extends Return {
  static defaultProps = {
    stores: [urlStore],
    initStates: [],
    pathStates: {},
  };
}

UrlReturn.displayName = 'FluxConnected(UrlReturn)';
export default UrlReturn;
