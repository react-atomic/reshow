import React, {PureComponent} from 'react';
import connect from './connect';

const connectFunctional = (
    viewFn,
    getStores,
    calculateState,
    options
) => {
    class FunctionalConnected extends PureComponent
    {
        static getStores(props)
        {
            return getStores(props);
        }

        static calculateState(prevState, props)
        {
            return calculateState(prevState, props);
        }

        render()
        {
            return viewFn(this.state);
        }
    }

    const viewFnName = 
        viewFn.displayName ||
        viewFn.name ||
        'FunctionalConnected';
    FunctionalConnected.displayName = viewFnName;
    return connect(FunctionalConnected, options);
}
export default connectFunctional;
