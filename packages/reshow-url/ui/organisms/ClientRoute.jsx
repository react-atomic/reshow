import {ajaxDispatch} from 'organism-react-ajax';
import {doc} from 'win-doc';

import Reshow, {update} from '../molecules/Reshow';
import pageStore from '../../src/stores/pageStore';
import handleAnchor from '../../src/handleAnchor';

const defaultOnUrlChange = url => handleAnchor => goAnchorDelay => {
  const separator = '/';
  const params = url.split(separator);
  const last = params.length - 1;
  const lastPath = params[last];
  const next = {
    pvid: url,
    themePath: null,
  };
  if (lastPath) {
    next.themePath = handleAnchor(lastPath)(goAnchorDelay);
  }
  return next;
};

class ClientRoute extends Reshow {
  static defaultProps = {
    ajax: false,
    goAnchorDelay: 1500,
  };

  componentDidMount() {
    super.componentDidMount();
    const props = this.props;
    const curUrl = props.url || doc().URL;
    const handleUrlChange = url => {
      const {onUrlChange, goAnchorDelay} = this.props;
      const thisUrlChangeFunc = onUrlChange ? onUrlChange : defaultOnUrlChange;
      const urlChangeStates = thisUrlChangeFunc(url)(handleAnchor)(
        goAnchorDelay,
      );
      return urlChangeStates;
    };
    update(handleUrlChange(curUrl)); //reset themePath
    setImmediate(() => 
      ajaxDispatch('config/set', { onUrlChange })
    );
  }
}

export default ClientRoute;
