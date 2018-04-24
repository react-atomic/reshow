import React from 'react'; 
import get from 'get-object-value';

import ReshowComponent, {initProps} from '../organisms/ReshowComponent';
import getChildren from '../../src/getChildren';
import pageStore from '../../src/stores/pageStore';
import realTimeStore from '../../src/stores/realTimeStore';
import {connect} from 'reshow-flux';

const realTimeKey = '--realTimeData--';

class RealTimeReturn extends ReshowComponent
{
   static defaultProps = {
        ...initProps,
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
        if (realTimeState) {
            const path = get(props, ['realTimePath']);
            const data = get(realTimeState, path);
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

/**
 * Explain why RealTimeReturn need re-connect.
 *
 * Because RealTimeReturn has override calculateState,
 * If trigger from flux getDerivedStateFromProps,
 * it will not call RealTimeReturn calculateState.
 */
export default connect(
    RealTimeReturn,
    {withProps:true}
);
