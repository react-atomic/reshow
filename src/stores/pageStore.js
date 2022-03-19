import { ImmutableStore, mergeMap } from "reshow-flux";
import { OBJ_SIZE } from "reshow-constant";

const [store, pageDispatch] = ImmutableStore((state, action) => {
  switch (action.type) {
    case "config/set":
      return mergeMap(state, action.params);
    case "config/reset":
      return mergeMap(state.clear(), action.params);
    default:
      return OBJ_SIZE(action) ? mergeMap(state, action) : state;
  }
});

export default store;
export { pageDispatch };
