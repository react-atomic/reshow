const config = root => {
  const reshowRuntimePath = root + '/node_modules/reshow-runtime';
  return {
    '@babel/runtime/helpers/esm': reshowRuntimePath + '/es',
    '@babel/runtime': reshowRuntimePath,
    'babel-runtime': reshowRuntimePath,
  };
};
export default config;
