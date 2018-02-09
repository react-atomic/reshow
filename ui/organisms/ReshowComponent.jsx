import React, {PureComponent} from 'react'; 
import get from 'get-object-value';
import {connect} from 'reshow-flux';

import {
    global,
    pageStore
} from '../../src/index';

const keys = Object.keys;

class ReshowComponent extends PureComponent
{
   static getStores(props)
   {
       return props.stores || [pageStore];
   }

   static get initStates()
   {
        return ['data', 'I18N'];
   }

   static get pathStates()
   {
        return {
            I13N: ['data', 'I13N'] 
        };
   }

   static calculateState(prevState, props)
   {
        const pageState = pageStore.getState();
        if (global.path !== pageState.get('themePath')) {
            return prevState;
        }
        const results = {};
        const initStates = props.initStates || this.initStates;
        initStates.forEach((key)=>{
            const data = pageState.get(key);
            if (data && data.toJS) {
                results[key] = data.toJS();
            } else {
                results[key] = data;
            }
        });
        const pathStates = props.pathStates || this.pathStates;
        keys(pathStates).forEach( key =>
            results[key] = get(results, pathStates[key])
        );
        return results;
   }
}

export default connect(
    ReshowComponent,
    {withProps:true}
);
