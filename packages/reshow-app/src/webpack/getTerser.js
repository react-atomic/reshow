import TerserPlugin from "terser-webpack-plugin";

/**
 * terser-webpack-plugin Doc
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 * terserOptions
 * https://github.com/terser/terser#minify-options
 *
 * terserOptions - compress
 * https://github.com/terser/terser#compress-options
 */

const getTerser = () => {
  const terser = new TerserPlugin({
    parallel: true,
    terserOptions: {
      ecma: 5,
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
  });
  return terser;
};

export default getTerser;
