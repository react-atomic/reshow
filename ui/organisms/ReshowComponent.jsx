import React, {PureComponent} from 'react'
import get from 'get-object-value'
import {connect} from 'reshow-flux'
import {Map} from 'immutable'

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
        const {initStates, pathStates, immutable: propsImmutable} = props
        const immutable = propsImmutable || pageState.get('immutable')
        const results = {}
        if (immutable) {
            results.immutable = immutable
        }
        get(initStates, null, []).forEach( key => {
            const data = pageState.get(key);
            if (!immutable && data && data.toJS) {
                results[key] = data.toJS();
            } else {
                results[key] = data;
            }
        })
        keys(get(pathStates, null, {})).forEach(
            key => results[key] = immutable ?
                get(results, [pathStates[key][0]], Map()).getIn(pathStates[key].slice(1)) : 
                get(results, pathStates[key])
        )
        return results
   }
}

export default connect(
    ReshowComponent,
    {withProps:true}
)
export {initProps}
