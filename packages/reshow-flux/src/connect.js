import dedup from 'array.dedup';

const DEFAULT_OPTIONS = {
    withProps: false,
    withConstructor: false
};

const keys = Object.keys;

const connect = (Base, options) =>
{
    let thisOptions = DEFAULT_OPTIONS;
    if (options) {
        keys(options).forEach(key => 
            thisOptions[key] = options[key]
        );
    }

    const getProps = (props) => thisOptions.withProps ? props : undefined;

    const getState = (self, prevState, maybeProps) => self.calculateState( prevState, getProps(maybeProps));

    const getStores = (self, maybeProps) => self.getStores(getProps(maybeProps));
    
    class ConnectedClass extends Base
    {
        __stores = [];

        __fluxHandler = () =>
        {
            const con = this.constructor;
            this.setState((prevState, currentProps)=>
                getState(con, prevState, currentProps) 
            );
        }

        __setStores = (stores) =>
        {
            if (this.__stores) {
                this.__resetStores();
            }
            stores = dedup(stores);
            stores.forEach(store =>
                store.addListener(this.__fluxHandler)
            );
            this.__stores = stores;
        }

        __resetStores = () =>
        {
            this.__stores.forEach(store =>
                store.removeListener(this.__fluxHandler)
            );
        }

        constructor(props)
        {
            super(props);
            const con = this.constructor;
            if (thisOptions.withConstructor) {
                this.__setStores(getStores(
                    con,
                    this.props
                ));
            }
            const calculatedState = getState(
                con,
                undefined,
                props
            );
            if (!this.state) {
                this.state = {};
            }
            if (calculatedState) {
                keys(calculatedState).forEach(key =>
                    this.state[key] = calculatedState[key]
                );
            }
        }

        componentDidMount()
        {
            if (super.componentDidMount) {
                super.componentDidMount();
            }
            if (!thisOptions.withConstructor) {
                this.__setStores(getStores(
                    this.constructor,
                    this.props
                ));
            }
        }

        componentWillReceiveProps(nextProps)
        {
            if (super.componentWillReceiveProps) {
                super.componentWillReceiveProps(nextProps);
            }
            const con = this.constructor;
            if (thisOptions.withProps) {
                this.__setStores(getStores(con, nextProps));
                this.setState(prevState => 
                    getState(con, prevState, nextProps)
                );
            }
        }

        componentWillUnmount()
        {
            if (super.componentWillUnmount) {
                super.componentWillUnmount();
            }
            this.__resetStores();
        }
    }
    const componentName = Base.displayName || Base.name;
    ConnectedClass.displayName = 'FluxConnected(' + componentName + ')';
    return ConnectedClass;
}

export default connect;
