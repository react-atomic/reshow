import webpack from 'webpack';
import Refresh from './refresh';
import getStatsJson from './getStatsJson';
import getBundleAnalyzerPlugin from './getBundleAnalyzerPlugin';
import FinishPlugin from './FinishPlugin';
import {PRODUCTION} from './const';

const {AggressiveMergingPlugin, LimitChunkCountPlugin} = webpack.optimize;

const getPlugins = ({path, stop, mode, BUNDLE, HOT_UPDATE, server}) => {
  const plugins = [getStatsJson()];
  if (server) {
    plugins.push(new LimitChunkCountPlugin({maxChunks: 1}));
  }
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
  if (HOT_UPDATE) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new Refresh({disableRefreshCheck: true}),
    );
  }
  if (stop) {
    plugins.push(new FinishPlugin({stop}));
  }
  return plugins;
};

export default getPlugins;
