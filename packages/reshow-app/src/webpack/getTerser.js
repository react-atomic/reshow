import TerserPlugin from "terser-webpack-plugin";

/**
 * https://github.com/terser/terser#compress-options
 * https://github.com/webpack-contrib/terser-webpack-plugin
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
      compress: {},
      mangle: true,
      module: false,
      output: {
        comments: false,
      },
      toplevel: true,
      nameCache: null,
      ie8: true,
      safari10: true,
    },
  });
  return terser;
};

export default getTerser;
