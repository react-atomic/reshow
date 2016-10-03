import React from 'react'; 
import { Reshow } from '../organisms/reshow';
import { Container } from 'flux/utils';

class ClientRoute extends Reshow
{
    parseUrl(url)
    {
        if (!url && 'undefined' !== typeof document) {
            url = document.URL;
        }
        const params = url.split('/');
        const last = params.length-1;
        if (params[last]) {
            return {
                themePath: params[last]
            };
        } else {
            return {};
        }
    }

    updateWithUrl(props)
    {
        const parseUrl = (props.parseUrl) ?
            props.parseUrl :
            this.parseUrl;
        this.update(Object.assign(
            {},
            props,
            parseUrl(props.url)
        ));
    }

    componentDidMount()
    {
        const self = this;
        const props = this.props;
        self.updateWithUrl.bind(self);
        self.updateWithUrl(props);
        window.onpopstate = (e)=> {
            self.updateWithUrl(props);
        };
    } 

}

const ClientRouteContainer = Container.create(ClientRoute);
export default ClientRouteContainer;
