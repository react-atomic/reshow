import React from 'react'; 
import { ajaxDispatch } from 'organism-react-ajax';
import { Reshow } from '../organisms/Reshow';
import pageStore from '../../src/stores/pageStore';
import { dispatch } from '../../src/actions/dispatcher';
import reshow from '../../src/reshow';

class ClientRoute extends Reshow
{
    static defaultProps = {
        ajax: false
    }

    parseUrl(url)
    {
        const separator = '/';
        const params = url.split(separator);
        const last = params.length-1;
        if (params[last]) {
            return {
                themePath: params[last]
            };
        } else {
            return {};
        }
    }

    componentDidMount()
    {
        const self = this;
        const props = this.props;
        const updateWithUrl = (url) =>
        {
            const state = pageStore.getState();
            const stateParseUrl = state.get('parseUrl');
            const parseUrl = (stateParseUrl) ?
                stateParseUrl : self.parseUrl;
            const configs = Object.assign(
                {parseUrl: parseUrl},
                parseUrl(url)
            );
            self.update(configs);
        };
        const curUrl = (props.url) ? props.url : document.URL;
        setTimeout(()=>{
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

export default reshow(ClientRoute);
