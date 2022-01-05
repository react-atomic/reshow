import { ImmutableStore, mergeMap } from "reshow-flux";
import { KEYS } from "reshow-constant";
import { realTimeDispatch } from "./realTimeStore";
import { messageDispatch } from "./messageStore";
import { sessionDispatch } from "./sessionStorageStore";
import { localDispatch } from "./localStorageStore";

const [store, dispatch] = ImmutableStore((state, action) => {
  switch (action.type) {
    case "dialog/start":
    case "dialog/end":
    case "alert/reset":
    case "alert/del":
    case "alert/add":
      messageDispatch(action);
      return state;
    case "realTime":
      realTimeDispatch(action);
      return state;
    case "local":
      localDispatch(action);
      return state;
    case "session":
      sessionDispatch(action);
      return state;
    case "config/set":
      return mergeMap(state, action.params);
    case "config/reset":
      return mergeMap(state.clear(), action.params);
      return state.clear().merge(action.params);
    default:
      if (KEYS(action)) {
        return mergeMap(state, action);
      } else {
        return state;
      }
  }
});

export default store;
export { dispatch };
