import React from 'react';
import Return, {initProps} from 'reshow-return';
import urlStore from '../../src/stores/urlStore';

class UrlReturn extends Return {
  static defaultProps = {
    stores: [urlStore]
  };
}

UrlReturn.displayName = 'FluxConnected(UrlReturn)';
export default UrlReturn;
