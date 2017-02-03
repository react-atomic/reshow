import React, {Component} from 'react'; 
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
        dispatch({
            type: 'config/set',
            params: params 
        });
    }

    componentDidMount()
    {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical &&
            canonical.href &&
            -1 !== canonical.href.indexOf(document.location.hostname)
           ) 
        {
            const newUrl = canonical.href+ document.location.search; 
            history.replaceState('', '', newUrl);
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
