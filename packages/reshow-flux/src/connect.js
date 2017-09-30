const DEFAULT_OPTIONS = {
    withProps: false
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
    const getState = (state, maybeProps) => {
        const props = thisOptions.withProps ? maybeProps : undefined;
        return Base.calculateState(state, props);
    };

    const getStores = (maybeProps) => {
        const props = thisOptions.withProps ? maybeProps : undefined;
        return Base.getStores(props);
    };
    
    class ConnectedClass extends Base
    {
        __stores = [];

        __fluxHandler = () =>
        {
            this.setState((prevState, currentProps)=>
                getState(prevState, currentProps) 
            );
        }

        __setStores = (stores) =>
        {
            if (this.__stores) {
                this.__resetStores();
            }
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
            this.__setStores(getStores(props));
            const calculatedState = getState(
                undefined,
                props
            );
            if (!this.state) {
                this.state = {};
            }
            keys(calculatedState).forEach(key => 
                this.state[key] = calculatedState[key]
            );
        }

        componentWillReceiveProps(nextProps)
        {
            if (super.componentWillReceiveProps) {
                super.componentWillReceiveProps(nextProps);
            }
            if (thisOptions.withProps) {
                this.__setStores(getStores(nextProps));
                this.setState(prevState => 
                    getState(prevState, nextProps)
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
