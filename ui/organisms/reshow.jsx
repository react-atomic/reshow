import {
    React,
    Component,
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

    render(){
        let self = this;
        return (
            <AjaxPage 
                themes={this.props.themes}
                themePath={this.state.themePath}
                baseUrl={this.props.baseUrl}
                callback={(json)=>{
                    self.update(json);
                }}
            />
        );
    }
}
const ReshowContainer = Container.create(Reshow);
export default ReshowContainer;
