import React from 'react'; 
import { Container } from 'flux/utils';
import { Reshow } from '../organisms/reshow';
import pageStore from '../../src/stores/pageStore';

class ClientRoute extends Reshow
{
    static defaultProps = {
        ajax: false
    }

    parseUrl(url)
    {
        if (!url && 'undefined' !== typeof document) {
            url = document.URL;
        }
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
            const parseUrl = (state.parseUrl) ?
                state.parseUrl :
                self.parseUrl;
            const configs = Object.assign(
                {parseUrl: parseUrl},
                parseUrl(url)
            );
            self.update(configs);
        };
        setTimeout(()=>{
            self.setState({
                updateWithUrl: updateWithUrl
            });
            updateWithUrl(props.url);
        });
        window.onpopstate = (e)=> {
            updateWithUrl(props.url);
        };
    } 
}

const ClientRouteContainer = Container.create(ClientRoute);
export default ClientRouteContainer;
