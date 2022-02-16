import React from "react";
import get from "get-object-value";
import { useConnect } from "reshow-flux";
import { build } from "react-atomic-molecule";
import { getReturn } from "reshow-return";

import { connectOptions } from "../molecules/ReshowComponent";
import realTimeStore from "../../src/stores/realTimeStore";

const REAL_TIME_KEY = "--realTimeData--";
const REAL_TIME_URL = "--realTimeUrl--";
const keys = Object.keys;

const calculateState = (prevState, options) => {
  const {
    realTimePath: path,
    realTimeUrl: url,
    realTimeReset,
    store,
  } = options;
  const realTimeState = store.getState();
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
    } else {
      return prevState;
    }
  }
};

const storeLocator = (props) => props.store || realTimeStore;

const myConnectOptions = {
  ...connectOptions,
  calculateState,
  realTimePath: [REAL_TIME_KEY],
  realTimeUrl: null,
  realTimeReset: false,
  storeLocator,
};

const RealTimeReturn = getReturn({
  cleanProps: ["realTimePath", "realTimeUrl", "realTimeReset"],
  useConnect: useConnect(myConnectOptions),
  displayName: "RealTimeReturn",
});

export default RealTimeReturn;
