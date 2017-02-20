import React, {Component} from 'react'; 
import get from 'get-object-value';

import {
    global,
    pageStore
} from '../../src/index';

const keys = Object.keys;

class ReshowComponent extends Component
{
   static getStores()
   {
       return [pageStore];
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

   static calculateState(prevState)
   {
        const pageState = pageStore.getState();
        if (global.path !== pageState.get('themePath')) {
            return prevState;
        }
        let results = {};
        this.initStates.forEach((key)=>{
            let data = pageState.get(key);
            if (data && data.toJS) {
                data = data.toJS();
            }
            results[key] = data;
        });
        const pathStates = this.pathStates;
        keys(pathStates).forEach((key)=>{
            results[key] = get(results, pathStates[key]);
        });
        return results;
   }
}

export default ReshowComponent;
