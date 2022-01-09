import { ImmutableStore, mergeMap } from "reshow-flux";
import { KEYS } from "reshow-constant";

const [store, pageDispatch] = ImmutableStore((state, action) => {
  switch (action.type) {
    case "config/set":
      return mergeMap(state, action.params);
    case "config/reset":
      return mergeMap(state.clear(), action.params);
    default:
      if (KEYS(action).length) {
        return mergeMap(state, action);
      } else {
        return state;
      }
  }
});

export default store;
export { pageDispatch };
