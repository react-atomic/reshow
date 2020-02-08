import webpack from 'webpack';
import Refresh from './refresh';
import getStatsJson from './getStatsJson';
import getBundleAnalyzerPlugin from './getBundleAnalyzerPlugin';
import FinishPlugin from './FinishPlugin';
import {PRODUCTION} from './const';

const {AggressiveMergingPlugin, LimitChunkCountPlugin} = webpack.optimize;

const getPlugins = ({path, stop, mode, confs, BUNDLE, HOT_UPDATE, server}) => {
  const plugins = [getStatsJson()];
  let maxChunks = confs.maxChunks;
  if (server) {
    maxChunks = 1;
  }
  if (maxChunks != null) {
    plugins.push(new LimitChunkCountPlugin({maxChunks}));
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
