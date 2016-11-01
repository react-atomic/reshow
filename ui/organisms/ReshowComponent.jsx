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

   static calculateState(prevState)
   {
        const pageState = pageStore.getState();
        if (global.path !== pageState.get('themePath')) {
            return prevState;
        }
        let data = pageState.get('data');
        let i18n = pageState.get('I18N');
        if (data && data.toJS) {
            data = data.toJS();
        }
        if (i18n && i18n.toJS) {
            i18n = i18n.toJS();
        }
        return {
            data: data,
            I18N: i18n
        }; 
   }
}

export default ReshowComponent;
