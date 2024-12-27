// @ts-check
import { ImmutableStore } from "reshow-flux";

/**
 * @type {[import("reshow-flux").ImmutableStoreObject<any, any>, import("reshow-flux-base").DispatchFunction<any, any>]}
 */
const [store, realTimeDispatch] = ImmutableStore((_state, action) => {
  switch (action.type) {
    case "realTime":
      return action.params || [];
    default:
      return [];
  }
});

export default store;
export { realTimeDispatch };
