const DEFAULT_OPTIONS = {
    withProps: false
};

const keys = Object.keys;

class Subscriptions
{
    _stores = [];
    _handler = null;

    setStores(stores, handler)
    {
        if (this._stores) {
            this.reset();
        }
        stores.forEach(store =>
            store.addListener(handler)
        );
        this._stores = stores;
        this._handler = handler;
    }

    reset()
    {
        let self = this;
        self._stores.forEach(store =>
            store.removeListener(self._handler)
        );
    }
}

const create = (Base, options) =>
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
    
    class ContainerClass extends Base
    {
        __fluxHandler = () =>
        {
            this.setState((prevState, currentProps)=>
                getState(prevState, currentProps) 
            );
        }

        constructor(props)
        {
            super(props);
            this.__subscriptions = new Subscriptions();
            this.__subscriptions.setStores(
                getStores(props),
                this.__fluxHandler
            );
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
                this.__subscriptions.setStores(
                    getStores(nextProps),
                    this.__fluxHandler
                );
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
            this.__subscriptions.reset();
        }
    }
    const componentName = Base.displayName || Base.name;
    ContainerClass.displayName = 'FluxContainer(' + componentName + ')';
    return ContainerClass;
}

export default create;
