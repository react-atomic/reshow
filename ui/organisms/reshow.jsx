import React, {Component} from 'react'; 
import {
    AjaxPage,
    Container,
    pageStore,
    global,
    dispatch
} from '../../src/index';

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
        let update =  pageState.get('updateWithUrl');
        if (update) {
            update = update.toJS();
        }
        return {
          themePath: global.path,
          updateWithUrl: update,
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

    render()
    {
        let self = this;
        const props = this.props;
        const state = this.state;
        return (
            <AjaxPage 
                /*State*/
                themePath={state.themePath}
                baseUrl={state.baseUrl}
                updateWithUrl={state.updateWithUrl}
                /*Props*/
                themes={props.themes}
                ajax={props.ajax}
                callback={(json)=>{
                    self.update(json);
                }}
            />
        );
    }
}
const ReshowContainer = Container.create(Reshow);

export { Reshow };
export default ReshowContainer;
