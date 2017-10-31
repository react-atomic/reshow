import React from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../organisms/ReshowComponent';
import pageStore from '../../src/stores/pageStore';
import realTimeStore from '../../src/stores/realTimeStore';

const realTimeKey = '--realTimeData--';

class ReshowRealTimeComponent extends ReshowComponent
{
   static getStores()
   {
       return [pageStore, realTimeStore];
   }
   
   static get realTimePath()
   {
        return [realTimeKey];
   }

   static calculateState(prevState)
   {
        let superData;
        if (super.constructor.calculateState) {
            superData = super.constructor.calculateState(prevState);
        } else {
            superData = super.calculateState(prevState);
        }

        const realTimeState = realTimeStore.getState();
        if (get(realTimeState, [realTimeKey])) {
            const data = get(realTimeState, this.realTimePath);
            if (data) {
                superData = {
                    ...prevState,
                    ...data
                };
            } else {
                superData = prevState;
            }
        }
        return superData;
   }
}

ReshowRealTimeComponent.displayName = 'FluxConnected(ReshowRealTimeComponent)';
export default ReshowRealTimeComponent;
