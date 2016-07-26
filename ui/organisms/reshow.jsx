import {
    React,
    Component,
    AjaxPage,
    dispatch
} from '../../src/index';

class Reshow extends Component
{
    constructor(props) {
        super(props);
        this.update(props);
        this.state = {
            themePath: props.themePath,
            popup: null
        };
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
                    self.setState({
                        themePath: json.themePath    
                    });
                }}
            />
        );
    }
}
export default Reshow;
