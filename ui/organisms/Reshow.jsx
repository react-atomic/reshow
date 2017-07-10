import React, {Component} from 'react';

import get from 'get-object-value';

import {
    dispatch,
    global,
    pageStore,
    AjaxPage,
} from '../../src/index';
import reshow from '../../src/reshow';

class Reshow extends Component
{
    static getStores()
    {
        return [pageStore];
    }

    static calculateState(prevState)
    {
        const pageState = pageStore.getState();
        global.path = pageState.get('themePath');
        return {
          themePath: global.path,
          baseUrl: pageState.get('baseUrl')
        }; 
    }

    constructor(props) {
        super(props);
        this.update(props);
    }

    componentWillReceiveProps(nextProps)
    {
        this.update(nextProps);
    }

    update(params){
        const realTimeData = get(params, ['--realTimeData--']);
        if (realTimeData) {
            dispatch({
                type: 'realTime',
                params: params 
            });
        } else {
            dispatch({
                type: 'config/set',
                params: params 
            });
        }
        if ('undefined' !== typeof document) {
            if (params.htmlTitle) {
                document.title = params.htmlTitle;
            }
            if (get(params, ['data', 'canonical'])) {
                this.updateCanonicalUrl(get(params, ['data', 'canonical']));
            }
        }
    }

    updateCanonicalUrl(url)
    {
        const newUrl = url+ document.location.search; 
        if (-1 !== url.indexOf(document.location.hostname)) {
            history.replaceState('', '', newUrl);
        } else {
            location.replace(newUrl);
        }
    }

    componentDidMount()
    {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical && canonical.href) 
        {
            this.updateCanonicalUrl(canonical.href);
        }
    }

    render()
    {
        const self = this;
        const {themes, ajax, webSocketUrl} = this.props;
        const {themePath, baseUrl} = this.state;
        return (
            <AjaxPage 
                callback={(json)=>{
                    self.update(json);
                }}
                /*State*/
                themePath={themePath}
                baseUrl={baseUrl}
                /*Props*/
                themes={themes}
                ajax={ajax}
                webSocketUrl={webSocketUrl}
            />
        );
    }
}

export { Reshow };
export default reshow(Reshow);
