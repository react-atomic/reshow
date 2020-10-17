import { ReduceStore } from "reshow-flux";
import dispatcher from "../dispatcher";

const keys = Object.keys;

class PageStore extends ReduceStore {
  getThemePath() {
    const state = this.getState();
    let themePath = state.get("themePath");
    if (!themePath) {
      themePath = state.get("defaultThemePath");
    }
    return themePath;
  }

  reduce(state, action) {
    switch (action.type) {
      case "config/set":
        return state.merge(action.params);
      case "config/reset":
        return state.clear().merge(action.params);
      case "realTime":
        return state;
      default:
        if (keys(action)) {
          return state.merge(action);
        } else {
          return state;
        }
    }
  }
}

// Export a singleton instance of the store
export default new PageStore(dispatcher);
