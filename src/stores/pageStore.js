import { ImmutableStore, mergeMap } from "reshow-flux";

const [store, pageDispatch] = ImmutableStore((state, action) => {
  switch (action.type) {
    case "config/set":
      return mergeMap(state, action.params);
    case "config/reset":
      return mergeMap(state.clear(), action.params);
    default:
      return mergeMap(state, action);
  }
});

export default store;
export { pageDispatch };
