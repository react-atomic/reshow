import webpack from "webpack";
import Refresh from "./refresh";
import getStatsJson from "./getStatsJson";
import getBundleAnalyzerPlugin from "./getBundleAnalyzerPlugin";
import FinishPlugin from "./FinishPlugin";
import NginxPushPlugin from "./NginxPushPlugin";
import { PRODUCTION } from "./const";

const { AggressiveMergingPlugin, LimitChunkCountPlugin } = webpack.optimize;

const assetsStore = { data: null };

const getPlugins = ({
  path,
  stop,
  mode,
  confs,
  BUNDLE,
  HOT_UPDATE,
  server,
}) => {
  const plugins = [];
  let maxChunks = confs.maxChunks;
  if (server) {
    maxChunks = 1;
  } else {
    plugins.push(
      getStatsJson({ assetsStore }),
      new NginxPushPlugin(confs, assetsStore)
    ); 
  }
  if (maxChunks != null) {
    plugins.push(new LimitChunkCountPlugin({ maxChunks }));
  }
  if (BUNDLE) {
    plugins.push(getBundleAnalyzerPlugin({ BUNDLE }));
  }
  if (mode === PRODUCTION) {
    plugins.push(
      new AggressiveMergingPlugin({
        minSizeReduce: 2,
        moveToParents: true,
      })
    );
  }
  if (HOT_UPDATE) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new Refresh({ disableRefreshCheck: true })
    );
  }
  if (stop) {
    plugins.push(new FinishPlugin({ stop }));
  }
  return plugins;
};

export default getPlugins;
