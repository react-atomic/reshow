import {PRODUCTION} from './const';

const getModule = ({mode}) => {
  const babelLoaderOption = {
    cacheDirectory: true,
    plugins: ['@babel/plugin-syntax-dynamic-import'],
    presets: [['@babel/preset-env', {modules: false}]],
  };
  if (mode === PRODUCTION) {
    babelLoaderOption.envName = PRODUCTION;
  } else {
    babelLoaderOption.plugins.push('react-refresh/babel');
  }
  return {
    rules: [
      {
        test: /(.js|.jsx)$/,
        exclude: /node_modules/,
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
  };
};

export default getModule;
