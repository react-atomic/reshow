"use strict";

import { ReduceStore } from "reshow-flux";
import dispatcher from "../dispatcher";

class RealTimeStore extends ReduceStore {
  reduce(state, action) {
    switch (action.type) {
      case "realTime":
        return action.params;
      default:
        return [];
    }
  }
}

export default new RealTimeStore(dispatcher);
