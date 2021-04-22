import React, { PureComponent } from "react";
import get from "get-object-value";
import { connectHook } from "reshow-flux";
import { build } from "react-atomic-molecule";

import { returnOptions, Return } from "../molecules/ReshowComponent";
import realTimeStore from "../../src/stores/realTimeStore";

const REAL_TIME_KEY = "--realTimeData--";
const REAL_TIME_URL = "--realTimeUrl--";
const keys = Object.keys;

const storeLocator = (props) => props.stores || [realTimeStore];

const calculateState = (prevState, props) => {
  const realTimeState = realTimeStore.getState();
  const { realTimePath: path, realTimeUrl: url, realTimeReset } = props;
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
      keys(prevState).forEach((key) => (reset[key] = null));
      return reset;
    }
  }
};

const defaultProps = {
  ...returnOptions.defaultProps,
  realTimePath: [REAL_TIME_KEY],
  realTimeUrl: null,
  realTimeReset: false,
  storeLocator,
};

const myReturnOptions = {
  ...returnOptions,
  calculateState,
  defaultProps,
};

const RealTimeReturn = (props) => {
  const { children, realTimePath, ...otherProps } = props;
  const myOtherProps = returnOptions.reset(otherProps);
  return (
    <Return>
      {(pageState) => {
        return build(children)({ ...pageState, ...myOtherProps });
      }}
    </Return>
  );
};

export default connectHook(RealTimeReturn, myReturnOptions);
