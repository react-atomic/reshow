import webpack from 'webpack';
import getStatsJson from './getStatsJson';
import getBundleAnalyzerPlugin from './getBundleAnalyzerPlugin';
import FinishPlugin from './FinishPlugin';
import {PRODUCTION} from './const';

const {AggressiveMergingPlugin} = webpack.optimize;

const getPlugins = ({path, stop, mode, BUNDLE}) => {
  const plugins = [getStatsJson()];
  if (BUNDLE) {
    plugins.push(getBundleAnalyzerPlugin({BUNDLE}));
  }
  if (mode === PRODUCTION) {
    plugins.push(
      new AggressiveMergingPlugin({
        minSizeReduce: 2,
        moveToParents: true,
      }),
    );
  }
  if (stop) {
    plugins.push(new FinishPlugin({stop}));
  }
  return plugins;
};

export default getPlugins;
