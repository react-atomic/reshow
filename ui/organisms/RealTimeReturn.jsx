import React, {PureComponent} from 'react';
import get from 'get-object-value';
import {connect} from 'reshow-flux';
import {build} from 'react-atomic-molecule';

import {initProps, Return} from '../molecules/ReshowComponent';
import realTimeStore from '../../src/stores/realTimeStore';

const REAL_TIME_KEY = '--realTimeData--';
const REAL_TIME_URL = '--realTimeUrl--';
const keys = Object.keys;

class RealTimeReturn extends PureComponent {
  static defaultProps = {
    ...initProps,
    realTimePath: [REAL_TIME_KEY],
    realTimeUrl: null,
    realTimeReset: false,
  };

  static getStores(props) {
    return props.stores || [realTimeStore];
  }

  static calculateState(prevState, props) {
    const realTimeState = realTimeStore.getState();
    const {realTimePath: path, realTimeUrl: url, realTimeReset} = props;
    const data = get(realTimeState, path);
    const wsUrl = get(realTimeState, [REAL_TIME_URL]);
    if (data && (!url || url === wsUrl)) {
      data[REAL_TIME_URL] = wsUrl;
      return data;
    } else {
      if (realTimeReset) {
        // Reset for when reconnection to new websocket server
        // will not send duplicate data to client
        const reset = {};
        keys(prevState).forEach(key => (reset[key] = null));
        return reset;
      }
    }
  }

  render() {
    const {children, realTimePath, ...props} = this.props;
    return (
      <Return {...props}>
        {pageState => build(children)({...pageState, ...this.state})}
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
  {withProps: true},
);
