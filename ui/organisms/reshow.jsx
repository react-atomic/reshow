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
          themePath: global.path,
          baseUrl: pageState.get('baseUrl'),
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
        return (
            <AjaxPage 
                {...this.state}
                callback={(json)=>{
                    self.update(json);
                }}
                /*Props*/
                themes={props.themes}
                ajax={props.ajax}
            />
        );
    }
}
const ReshowContainer = Container.create(Reshow);

export { Reshow };
export default ReshowContainer;
