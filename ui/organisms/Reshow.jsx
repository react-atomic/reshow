import React, {Component} from 'react';
import get from 'get-object-value';
import {AjaxPage} from 'organism-react-ajax';
import {Container} from 'reshow-flux';

import {
    dispatch,
    global,
    pageStore,
} from '../../src/index';

const isArray = Array.isArray;

let win;
let doc;

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
          baseUrl: pageState.get('baseUrl'),
          staticVersion: pageState.get('staticVersion')
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
        if (doc) {
            const htmlTitle = get(params, ['htmlTitle']);
            if (htmlTitle) {
                if (isArray(htmlTitle)) {
                    doc.title = get(htmlTitle, [0]);
                } else {
                    doc.title = htmlTitle;
                }
            }
            const canonical = get(params, ['data', 'canonical']);
            if (canonical) {
                this.updateCanonicalUrl(canonical);
            }
        }
    }

    getLStore()
    {
        return get(win, ['localStorage']);
    }

    updateCanonicalUrl(url)
    {
        const lStore = this.getLStore();
        if (lStore) {
            if (lStore.getItem('no-canonical')) {
                return;
            }
        }
        const loc = doc.location; 
        const newUrl = url+ loc.search; 
        if (-1 !== url.indexOf(loc.hostname)) {
            history.replaceState('', '', newUrl);
        } else {
            loc.replace(newUrl);
        }
    }

    componentDidMount()
    {
        win = window;
        doc = document;
        const canonical = doc.querySelector('link[rel="canonical"]');
        if (-1 !== doc.URL.indexOf('--no-canonical')) {
            const lStore = this.getLStore();
            if (lStore) {
                lStore.setItem(
                    'no-canonical',
                    1
                );
            }
        } else if (canonical && canonical.href) {
            this.updateCanonicalUrl(canonical.href);
        }
    }

    render()
    {
        const self = this;
        const {themes, ajax, webSocketUrl} = this.props;
        const {themePath, baseUrl, staticVersion} = this.state;
        return (
            <AjaxPage 
                callback={(json)=>{
                    self.update(json);
                }}
                /*State*/
                themePath={themePath}
                baseUrl={baseUrl}
                staticVersion={get(
                    staticVersion,
                    [],
                    ()=>((new Date()).getTime())+''+Math.random()
                )}
                /*Props*/
                themes={themes}
                ajax={ajax}
                webSocketUrl={webSocketUrl}
            />
        );
    }
}

export { Reshow };
export default Container(Reshow);
