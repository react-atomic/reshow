const config = root => {
  const reshowRuntimePath = root + '/node_modules/reshow-runtime';
  return {
    '@babel/runtime/helpers/esm': reshowRuntimePath + '/es',
    '@babel/runtime/helpers': reshowRuntimePath + '/helpers',
    'babel-runtime/helpers': reshowRuntimePath + '/helpers',
  };
};
export default config;
