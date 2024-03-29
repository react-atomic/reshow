export default store;
declare const store: {
    getMap: (arg0: import("reshow-flux/types/ImmutableStore").MapKeyType) => any;
    reset: () => import("reshow-flux/types/ImmutableStore").StateMap;
    getState: () => import("reshow-flux/types/ImmutableStore").StateMap;
    addListener: import("reshow-flux-base/types/type").EmitterAddCall<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux").MaybeMapType>;
    removeListener: import("reshow-flux-base/types/type").EmitterRemoveCall<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux").MaybeMapType>;
};
export const pageDispatch: import("reshow-flux-base/types/createReducer").DispatchFunction<import("reshow-flux/types/ImmutableStore").StateMap, import("reshow-flux").MaybeMapType>;
