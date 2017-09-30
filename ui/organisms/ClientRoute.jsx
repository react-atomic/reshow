import { ajaxDispatch } from 'organism-react-ajax';

import Reshow from '../organisms/Reshow';
import pageStore from '../../src/stores/pageStore';
import handleAnchor from '../../src/handleAnchor';

const defaultParseUrl = (url, goAnchorDelay)=>
{
    const separator = '/';
    const params = url.split(separator);
    const last = params.length-1;
    let lastPath = params[last];
    if (lastPath) {
        lastPath = handleAnchor(lastPath, goAnchorDelay);
        return {
            themePath: lastPath,
        };
    } else {
        return {};
    }
};

class ClientRoute extends Reshow
{
    static defaultProps = {
        ajax: false,
        goAnchorDelay: 1500
    }

    componentDidMount()
    {
        const self = this;
        const props = this.props;
        const updateWithUrl = (url) =>
        {
            const state = pageStore.getState();
            const stateParseUrl = state.get('parseUrl');
            const goAnchorDelay = state.get('goAnchorDelay');
            const parseUrl = (stateParseUrl) ? stateParseUrl : defaultParseUrl;
            const parseUrlConfigs = parseUrl(url, goAnchorDelay);
            const configs = {
                parseUrl: parseUrl,
                ...parseUrlConfigs
            };
            self.update(configs);
        };
        const curUrl = (props.url) ? props.url : document.URL;
        setImmediate(()=>{
            ajaxDispatch({
                type: 'config/set',
                params: {
                    updateWithUrl: updateWithUrl
                }
            });
            updateWithUrl(curUrl);
        });
    }
}

export default ClientRoute;
