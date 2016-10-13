import React from 'react'; 
import { Container } from 'flux/utils';
import { ajaxDispatch } from 'organism-react-ajax';
import { Reshow } from '../organisms/reshow';
import pageStore from '../../src/stores/pageStore';
import { dispatch } from '../../src/actions/dispatcher';

class ClientRoute extends Reshow
{
    static defaultProps = {
        ajax: false
    }

    parseUrl(url)
    {
        const separator = (-1 !== url.indexOf('#')) ? '#': '/';
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

const ClientRouteContainer = Container.create(ClientRoute);
export default ClientRouteContainer;
