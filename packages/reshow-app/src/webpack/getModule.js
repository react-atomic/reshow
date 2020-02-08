import {PRODUCTION} from './const';

const getModule = ({mode, HOT_UPDATE}) => {
  const babelLoaderOption = {
    cacheDirectory: true,
    plugins: ['@babel/plugin-syntax-dynamic-import'],
    presets: [['@babel/preset-env', {modules: false}]],
  };
  if (mode === PRODUCTION) {
    babelLoaderOption.envName = PRODUCTION;
  }
  if (HOT_UPDATE) {
    babelLoaderOption.plugins.push('react-refresh/babel');
  }
  const module = {
    rules: [
      {
        test: /(.js|.jsx)$/,
        exclude: [/node_modules/],
        use: [
          'thread-loader',
          'cache-loader',
          {
            loader: 'babel-loader',
            options: babelLoaderOption,
          }
        ],
      },
    ],
  }
  return module;
};

export default getModule;
