import getStatsJson from './getStatsJson';
import getBundleAnalyzerPlugin from './getBundleAnalyzerPlugin';
import FinishPlugin from './FinishPlugin';

const getPlugins = ({path, stop, BUNDLE}) => {
  const plugins = [
    getStatsJson(),
  ];
  if (BUNDLE) {
    plugins.push(getBundleAnalyzerPlugin({BUNDLE}));
  }
  if (stop) {
    plugins.push(new FinishPlugin({stop}));
  }
  return plugins;
};

export default getPlugins;
