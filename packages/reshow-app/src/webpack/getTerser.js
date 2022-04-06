import TerserPlugin from "terser-webpack-plugin";

/**
 * terser-webpack-plugin Doc
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 * SWC options
 * https://swc.rs/docs/configuration/minification
 *
 */
const getTerser = () =>
  new TerserPlugin({
    minify: TerserPlugin.swcMinify,
    parallel: true,
    terserOptions: {
      compress: {
        passes: 2,
        keep_classnames: true,
        toplevel: true,
      },
      mangle: {
        keepClassNames: true,
        keepFnNames: false,
        topLevel: true,
        ie8: true,
        safari10: true,
      },
    },
  });

export default getTerser;

/** Backup terserOptions (non swc)
 *
 * terserOptions
 * https://github.com/terser/terser#minify-options
 *
 * terserOptions - compress
 * https://github.com/terser/terser#compress-options
 */
/**
terserOptions: {
  parse: {},
  compress: {
    passes: 2,
    keep_classnames: true,
    toplevel: true,
  },
  mangle: true,
  format: {
    comments: false,
  },
  keep_classnames: true,
  toplevel: true,
  nameCache: null,
  ie8: true,
  safari10: true,
},
*/
