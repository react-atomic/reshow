import { ajaxDispatch } from 'organism-react-ajax';

import Reshow, {update} from '../organisms/Reshow';
import pageStore from '../../src/stores/pageStore';
import handleAnchor from '../../src/handleAnchor';

const defaultParseUrl = url => handleAnchor => goAnchorDelay =>
{
    const separator = '/';
    const params = url.split(separator);
    const last = params.length-1;
    let lastPath = params[last];
    if (lastPath) {
        lastPath = handleAnchor(lastPath)(goAnchorDelay);
        return {
            themePath: lastPath,
        };
    } else {
        return {
            themePath: null
        };
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
        super.componentDidMount();
        const self = this;
        const props = this.props;
        const updateWithUrl = (url) =>
        {
            const {parseUrl, goAnchorDelay} = props;
            const thisParseUrlFunc = (parseUrl) ? parseUrl : defaultParseUrl;
            const parseUrlConfigs = thisParseUrlFunc(url)(handleAnchor)(goAnchorDelay);
            update(parseUrlConfigs);
        };
        const curUrl = (props.url) ? props.url : document.URL;
        setImmediate(()=>{
            ajaxDispatch({
                type: 'config/set',
                params: { updateWithUrl }
            });
            updateWithUrl(curUrl);
        });
    }
}

export default ClientRoute;
