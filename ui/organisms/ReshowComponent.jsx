import React, {PureComponent} from 'react'; 
import get from 'get-object-value';
import {connect} from 'reshow-flux';

import {
    global,
    pageStore
} from '../../src/index';

const keys = Object.keys;

const initProps = {
    initStates: ['data', 'I18N'],
    pathStates: {
        I13N: ['data', 'I13N']
    },
};

class ReshowComponent extends PureComponent
{
   static defaultProps = initProps;

   static getStores(props)
   {
       return props.stores || [pageStore];
   }

   static calculateState(prevState, props)
   {
        /**
         * Why not support multi stores?
         * Because multi stores need handle complex data merge.
         * If that case need create custom calculateState functoin.
         */
        const thisStore = this.getStores(props)[0];
        const pageState = thisStore.getState();
        if (global.path !== pageState.get('themePath')) {
            return prevState;
        }
        const results = {};
        const initStates = props.initStates;
        get(initStates, null, []).forEach((key)=>{
            const data = pageState.get(key);
            if (data && data.toJS) {
                results[key] = data.toJS();
            } else {
                results[key] = data;
            }
        });
        const pathStates = props.pathStates;
        keys(get(pathStates, null, {})).forEach( key =>
            results[key] = get(results, pathStates[key])
        );
        return results;
   }
}

export default connect(
    ReshowComponent,
    {withProps:true}
);
export {initProps};
