const reshowRuntimePath = root + '/node_modules/reshow-runtime';

const config = root => ({
  '@babel/runtime/helpers/esm': reshowRuntimePath + '/es',
  '@babel/runtime': reshowRuntimePath,
  'babel-runtime': reshowRuntimePath,
});

export default config;
