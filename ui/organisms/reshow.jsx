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
        return {
          themePath: global.path
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
                themes={props.themes}
                themePath={state.themePath}
                baseUrl={props.baseUrl}
                ajax={props.ajax}
                callback={(json)=>{
                    self.update(json);
                }}
            />
        );
    }
}
export { Reshow };
const ReshowContainer = Container.create(Reshow);
export default ReshowContainer;
