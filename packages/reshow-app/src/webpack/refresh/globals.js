const getRefreshGlobalScope = (runtimeGlobals) => {
  return `${runtimeGlobals.require || "__webpack_require__"}.$Refresh$`;
};

const refreshUtils = "__react_refresh_utils__";

export { getRefreshGlobalScope, refreshUtils };
