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
          '@babel/react',
        ],
        plugins: [
          'add-module-exports',
          'transform-react-pure-class-to-function',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
        ],
      },
      es: {
        presets: [
          [
            '@babel/env',
            {
              modules: false,
              targets: ['last 2 versions', 'ie >= 8'],
            },
          ],
          '@babel/react',
        ],
        plugins: [
          'transform-react-pure-class-to-function',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
        ],
      },
    },
  };
};
