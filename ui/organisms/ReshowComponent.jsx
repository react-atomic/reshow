import React, {Component} from 'react'; 
import {
    global,
    pageStore
} from '../../src/index';

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
        return results;
   }
}

export default ReshowComponent;
