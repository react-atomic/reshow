import Reshow, {pageStore, update} from 'reshow';
import {doc} from 'win-doc';
import {ajaxDispatch} from 'organism-react-ajax';
import handleAnchor from '../../src/handleAnchor';
import urlStore from '../../src/stores/urlStore';

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
    const {onUrlChange, goAnchorDelay} = this.props;
    const handleUrlChange = url => {
      const thisUrlChangeFunc = onUrlChange ? onUrlChange : defaultOnUrlChange;
      const urlChangeStates = thisUrlChangeFunc(url)(handleAnchor)(
        goAnchorDelay,
      );
      setImmediate(() => update(urlChangeStates)); //reset themePath
      return urlChangeStates;
    };

    handleUrlChange(curUrl);
    ajaxDispatch('config/set', {onUrlChange: handleUrlChange});
  }
}

export default ClientRoute;
