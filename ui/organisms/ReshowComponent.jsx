import {
    React,
    Component,
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
        let pageState = pageStore.getState();
        let data = pageState.get('data').toJS();
        let i18n = pageState.get('I18N').toJS();
        return {
            data: data,
            I18N: i18n
        }; 
   }
}

export default ReshowComponent;
