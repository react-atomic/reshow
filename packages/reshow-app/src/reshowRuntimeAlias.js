const config = root => ({
    '@babel/runtime/helpers/esm': root + '/node_modules/reshow-runtime/es',
    '@babel/runtime': root + '/node_modules/reshow-runtime',
});

export default config;
