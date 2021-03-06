import React from "react";
import get from "get-object-value";
import { useConnect } from "reshow-flux";
import { build } from "react-atomic-molecule";
import { getReturn } from "reshow-return";

import { defaultProps, returnOptions } from "../molecules/ReshowComponent";
import realTimeStore from "../../src/stores/realTimeStore";

const REAL_TIME_KEY = "--realTimeData--";
const REAL_TIME_URL = "--realTimeUrl--";
const keys = Object.keys;

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

const myReturnOptions = {
  ...returnOptions,
  calculateState,
};

const storeLocator = (props) => props.stores || [realTimeStore];

const realTimeDefaultProps = {
  ...defaultProps,
  cleanProps: ["realTimePath", "realTimeUrl", "realTimeReset"],
  realTimePath: [REAL_TIME_KEY],
  realTimeUrl: null,
  realTimeReset: false,
  useConnect: useConnect(myReturnOptions),
  storeLocator,
};

const RealTimeReturn = getReturn({
  defaultProps: realTimeDefaultProps,
  displayName: "RealTime",
});

export default RealTimeReturn;
