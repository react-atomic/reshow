/* global $RefreshUtils$ */

/**
 * Code injected to each JS-like module for react-refresh capabilities.
 *
 * `$RefreshUtils$` is replaced to the actual utils during source parsing by `webpack.ProvidePlugin`.
 *
 * The function declaration syntax below is needed for `Template.getFunctionContent` to parse this.
 *
 * [Reference for Runtime Injection](https://github.com/webpack/webpack/blob/b07d3b67d2252f08e4bb65d354a11c9b69f8b434/lib/HotModuleReplacementPlugin.js#L419)
 * [Reference for HMR Error Recovery](https://github.com/webpack/webpack/issues/418#issuecomment-490296365)
 */
module.exports = (isUseEsm) => {
  const constDeclaration = "const";
  const letDeclaration = "let";
  const webpackHot = isUseEsm ? "import.meta.webpackHot" : "module.hot";
  const s = `
    ${constDeclaration} $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
    ${constDeclaration} $ReactRefreshCurrentExports$ = $RefreshUtils$.getModuleExports(
      $ReactRefreshModuleId$
    );
    function $ReactRefreshModuleRuntime$(exports) {
      if (${webpackHot}) {
        ${letDeclaration} errorOverlay;
        if (typeof __react_refresh_error_overlay__ !== 'undefined') {
          errorOverlay = __react_refresh_error_overlay__;
        }
        ${letDeclaration} testMode;
        if (typeof __react_refresh_test__ !== 'undefined') {
          testMode = __react_refresh_test__;
        }
        return $RefreshUtils$.executeRuntime(
          exports,
          $ReactRefreshModuleId$,
          ${webpackHot},
          errorOverlay,
          testMode
        );
      }
    }
    if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
      $ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
    } else {
      $ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
   }
  `;
  return s;
};
