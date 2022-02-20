import TerserPlugin from "terser-webpack-plugin";

/**
 * Doc
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
      cache: true,
      beautify: false,
      ecma: 5,
      warnings: false,
      parse: {},
      compress: {
        passes: 2,
      },
      mangle: true,
      module: false,
      output: {
        comments: false,
      },
      toplevel: true,
      nameCache: null,
      keep_classnames: true,
      ie8: true,
      safari10: true,
    },
  });
  return terser;
};

export default getTerser;
