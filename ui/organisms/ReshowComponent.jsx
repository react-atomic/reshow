import {
    React,
    Component,
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
        const data = pageState.get('data').toJS();
        const i18n = pageState.get('I18N').toJS();
        return {
            data: data,
            I18N: i18n
        }; 
   }
}

export default ReshowComponent;
