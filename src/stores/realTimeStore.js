import { ImmutableStore } from "reshow-flux";

const [store, realTimeDispatch] = ImmutableStore((state, action) => {
  switch (action.type) {
    case "realTime":
      return action.params || [];
    default:
      return [];
  }
});

export default store;
export { realTimeDispatch };
