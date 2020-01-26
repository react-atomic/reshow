import webpack from 'webpack';
import Refresh from './refresh';
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
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new Refresh({disableRefreshCheck: true})
    );
  }
  if (stop) {
    plugins.push(new FinishPlugin({stop}));
  }
  return plugins;
};

export default getPlugins;
