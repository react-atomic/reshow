import React from 'react'; 
import get from 'get-object-value';

import ReshowComponent from '../organisms/ReshowComponent';
import getChildren from '../../src/getChildren';
import pageStore from '../../src/stores/pageStore';
import realTimeStore from '../../src/stores/realTimeStore';

const realTimeKey = '--realTimeData--';

class RealTimeReturn extends ReshowComponent
{
   static defaultProps = {
        realTimePath: [realTimeKey]
   };

   static getStores(props)
   {
       return props.stores || [pageStore, realTimeStore];
   }

   static calculateState(prevState, props)
   {
        let superData;
        if (super.constructor.calculateState) {
            superData = super.constructor.calculateState(prevState, props);
        } else {
            superData = super.calculateState(prevState, props);
        }

        const realTimeState = realTimeStore.getState();
        if (get(realTimeState, [realTimeKey])) {
            const data = get(realTimeState, get(props, ['realTimePath']));
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

    render()
    {
       return getChildren(
        this.props.children,
        this.state
       );
    }
}

RealTimeReturn.displayName = 'FluxConnected(RealTimeReturn)';
export default RealTimeReturn;
