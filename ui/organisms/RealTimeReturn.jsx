import React from "react";
import get from "get-object-value";
import { useConnect } from "reshow-flux";
import { build } from "react-atomic-molecule";
import { getReturn } from "reshow-return";
import {
  KEYS,
  IS_ARRAY,
  REAL_TIME_URL,
  REAL_TIME_DATA_KEY,
} from "reshow-constant";

import { connectOptions } from "../molecules/ReshowComponent";
import realTimeStore from "../../src/stores/realTimeStore";

const calculateState = (prevState, options) => {
  /**
   * storeState was pass from reducer directly to avoid synchronous get wrong data.
   */
  const {
    realTimePath: path,
    realTimeUrl: url,
    realTimeReset,
    storeSyncState: realTimeState,
  } = options;
  if (IS_ARRAY(path) && path.length) {
    path.unshift(REAL_TIME_DATA_KEY);
  }
  const state = get(realTimeState, path || [REAL_TIME_DATA_KEY]);
  const wsUrl = get(realTimeState, [REAL_TIME_URL]);
  if (state && (!url || url === wsUrl)) {
    state[REAL_TIME_URL] = wsUrl;
    return state;
  } else {
    if (realTimeReset) {
      // Reset for when reconnection to new websocket server
      // will not send duplicate data to client
      const reset = {};
      KEYS(prevState).forEach((key) => (reset[key] = null));
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
  realTimePath: null,
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
