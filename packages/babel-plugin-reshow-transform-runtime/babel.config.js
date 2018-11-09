module.exports = function(api) {
  api.cache(true); 
  return {
    env: {
      build: {
        presets: [
          [
            '@babel/env',
            {
              targets: ['last 2 versions', 'ie >= 8'],
            },
          ],
        ],
        plugins: [
          'add-module-exports',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
        ],
      },
    },
  };
};
