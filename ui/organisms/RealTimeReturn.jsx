import React, {PureComponent} from 'react'; 
import get from 'get-object-value';
import {connect} from 'reshow-flux';

import {initProps} from '../organisms/ReshowComponent';
import Return from '../organisms/Return';
import getChildren from '../../src/getChildren';
import realTimeStore from '../../src/stores/realTimeStore';

const realTimeKey = '--realTimeData--';

class RealTimeReturn extends PureComponent
{
  static defaultProps = {
      ...initProps,
      realTimePath: [realTimeKey]
  };

  static getStores(props)
  {
      return props.stores || [realTimeStore];
  }

  static calculateState(prevState, props)
  {
       const realTimeState = realTimeStore.getState();
       const path = get(props, ['realTimePath']);
       const data = get(realTimeState, path);
       if (data) {
           return data;
       } else {
           return prevState;
       }
  }

  render()
  {
    const {children, realTimePath, ...props} = this.props;
    return (
      <Return {...props}>
        {pageState =>
            getChildren(
              children,
              {...pageState, ...this.state}
            )
        }
      </Return>
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
