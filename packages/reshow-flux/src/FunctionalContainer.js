import {PureComponent} from 'react';
import create from './Container';

const createFunctional = (
    viewFn,
    getStores,
    calculateState,
    options
) => {
    class FunctionalContainer extends PureComponent
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

    const viewFnName = viewFn.displayName || viewFn.name || 'FunctionalContainer';
    FunctionalContainer.displayName = viewFnName;
    return create(FunctionalContainer, options);
}
export default createFunctional;
