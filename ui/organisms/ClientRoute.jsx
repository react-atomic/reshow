import {ajaxDispatch} from 'organism-react-ajax';
import {doc} from 'win-doc';

import Reshow, {update} from '../molecules/Reshow';
import pageStore from '../../src/stores/pageStore';
import handleAnchor from '../../src/handleAnchor';

const defaultParseUrl = url => handleAnchor => goAnchorDelay => {
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
    const updateWithUrl = url => {
      const {parseUrl, goAnchorDelay} = this.props;
      const thisParseUrlFunc = parseUrl ? parseUrl : defaultParseUrl;
      const parseUrlConfigs = thisParseUrlFunc(url)(handleAnchor)(
        goAnchorDelay,
      );
      update(parseUrlConfigs);
      return parseUrlConfigs;
    };
    const {themePath} = updateWithUrl(curUrl);
    this.setState({themePath});
    setImmediate(() => {
      ajaxDispatch({
        type: 'config/set',
        params: {updateWithUrl},
      });
    });
  }
}

export default ClientRoute;
