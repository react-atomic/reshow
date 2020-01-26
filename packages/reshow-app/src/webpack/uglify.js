import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';

/* Default uglifyJs options */
const uglifyJsOptions = {
  test: /(.js|.jsx)$/,
  uglifyES: {
    compress: {
      unused: true,
      dead_code: true,
      join_vars: false,
      hoist_funs: true,
      collapse_vars: true,
      passes: 2,
      side_effects: true,
      warnings: false,
    },
    mangle: false,
    output: {
      comments: true,
      beautify: true,
    },
  },
};

const getProdUglify = () =>
  new ParallelUglifyPlugin({
    ...uglifyJsOptions,
    uglifyES: {
      ...uglifyJsOptions.uglifyES,
      output: {
        comments: false,
        beautify: false,
      },
    },
  });

const getUglify = () => new ParallelUglifyPlugin(uglifyJsOptions);

export {getProdUglify, getUglify};
