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
    immutable: false
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
        const thisThemePath = pageState.get('themePath')
        if (thisThemePath && global.path !== thisThemePath) {
            return prevState
        }
        const results = {};
        const {initStates, pathStates, immutable} = props
        const thisImmutable = immutable || pageState.get('--immutable--')
        get(initStates, null, []).forEach( key => {
            const data = pageState.get(key);
            if (!thisImmutable && data && data.toJS) {
                results[key] = data.toJS();
            } else {
                results[key] = data;
            }
        })
        keys(get(pathStates, null, {})).forEach( key => {
            const path = get(pathStates, [key], [])
            if (path > 1) {
                const data = get(results, path[0])
                if (data && data.toJS) {
                    results[key] = get(data.toJS(), path.slice(1))
                    return
                } else {
                    results[key] = get(data, path.slice(1))
                    return
                }
            } else {
                results[key] = get(results, path)
                return
            }
        })
        return results
   }
}

export default connect(
    ReshowComponent,
    {withProps:true}
)
export {initProps}
