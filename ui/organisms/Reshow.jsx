import React, {PureComponent} from 'react';
import get from 'get-object-value';
import {AjaxPage} from 'organism-react-ajax';
import {connect} from 'reshow-flux';

import {
    dispatch,
    global,
    pageStore,
} from '../../src/index';

const isArray = Array.isArray;

let win;
let doc;
let isInit;

const getLStore = () => get(win, ['localStorage']);

const updateCanonicalUrl = (url, props) =>
{
    if (get(props, ['disableCanonical'])) {
        return;
    }
    const lStore = getLStore();
    if (lStore) {
        if (lStore.getItem('disableCanonical')) {
            return;
        }
    }
    const loc = doc.location; 
    const newUrl = url+ loc.search+ loc.hash;
    if (-1 !== url.indexOf(loc.hostname)) {
        history.replaceState('', '', newUrl);
    } else {
        loc.replace(newUrl);
    }
};

const update = params => 
{
    const realTimeData = get(params, ['--realTimeData--']);
    const reset = get(params, ['--reset--']);
    let type;
    if (realTimeData) {
        type = 'realTime';
    } else {
        type = 'config/'+ ((reset) ? 're' : '')+ 'set';
    }
    dispatch({ type, params });
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
            updateCanonicalUrl(canonical, params);
        }
    }
};

class Reshow extends PureComponent
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
        if (isInit) {
            console.warn('The best practice is avoid multi Reshow Component.');
            this.stop = true;
        } else {
            update(props);
            this.stop = false;
            isInit = 1;
        }
    }

    componentDidMount()
    {
        win = window;
        doc = document;
        const canonical = doc.querySelector('link[rel="canonical"]');
        if (-1 !== doc.URL.indexOf('--disableCanonical')) {
            const lStore = getLStore();
            if (lStore) {
                lStore.setItem(
                    'disableCanonical',
                    1
                );
            }
        } else if (canonical && canonical.href) {
            updateCanonicalUrl(canonical.href, this.props);
        }
    }

    render()
    {
        if (this.stop) {
            return null;
        }
        const {themes, defaultThemePath, ajax, webSocketUrl} = this.props;
        const {themePath, baseUrl, staticVersion} = this.state;
        return (
            <AjaxPage 
                callback={ json => update(json) }
                /*State*/
                themePath={themePath}
                baseUrl={baseUrl}
                staticVersion={staticVersion} /* Keep pure value, let user don't assin etra value for emtpy. */
                /*Props*/
                themes={themes}
                defaultThemePath={defaultThemePath}
                ajax={ajax}
                webSocketUrl={webSocketUrl}
            />
        );
    }
}

export default connect(Reshow);
export {update};
