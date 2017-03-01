import React, {Component} from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../organisms/ReshowComponent';
import pageStore from '../../src/stores/pageStore';
import realTimeStore from '../../src/stores/realTimeStore';

class ReshowRealTimeComponent extends ReshowComponent
{
   static getStores()
   {
       return [pageStore, realTimeStore];
   }
   
   static get realTimePath()
   {
        return ['--realTimeData--'];
   }

   static calculateState(prevState)
   {
        const realTimeState = realTimeStore.getState();
        const data = get(realTimeState, this.realTimePath); 
        let superData = super.calculateState(prevState);
        if (data) {
            superData = {
                ...superData,
                ...data
            };
        }
        return superData;
   }
}

export default ReshowRealTimeComponent;
