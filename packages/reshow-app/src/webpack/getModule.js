import {PRODUCTION} from './const';

const getModule = ({mode}) => {
  const babelLoaderOption = {
    cacheDirectory: true,
    plugins: ['@babel/plugin-syntax-dynamic-import'],
    presets: [['@babel/preset-env', {modules: false}]],
  };
  if (mode === PRODUCTION) {
    babelLoaderOption.envName = PRODUCTION;
  }
  return {
    rules: [
      {
        test: /(.js|.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelLoaderOption,
      },
    ],
  };
};

export default getModule;
