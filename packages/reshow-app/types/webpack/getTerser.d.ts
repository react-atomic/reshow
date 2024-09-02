export default getTerser;
/**
 * terser-webpack-plugin Doc
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 * SWC options
 * https://swc.rs/docs/configuration/minification
 * https://github.com/swc-project/swc/blob/main/node-swc/src/types.ts
 *
 */
declare function getTerser(): TerserPlugin<import("terser", { with: { "resolution-mode": "import" } }).MinifyOptions>;
import TerserPlugin from "terser-webpack-plugin";
