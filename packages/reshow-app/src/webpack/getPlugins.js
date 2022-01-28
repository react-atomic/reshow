import webpack from "webpack";

import FinishPlugin from "./FinishPlugin";
import getStatsJson from "./getStatsJson";
import getWorkbox from "./getWorkbox";
import getHTML from "./getHTML";
import getBundleAnalyzerPlugin from "./getBundleAnalyzerPlugin";
import NginxPushPlugin from "./NginxPushPlugin";
import Refresh from "./refresh";
import { PRODUCTION } from "./const";

const { AggressiveMergingPlugin, LimitChunkCountPlugin } = webpack.optimize;

const assetsStore = { current: null };

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
  if (confs.indexTpl) {
    plugins.push(getHTML(confs));
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
  } else {
    // get Workbox for non hot update
    plugins.push(getWorkbox(confs));
  }
  if (stop) {
    plugins.push(new FinishPlugin({ stop }));
  }
  return plugins;
};

export default getPlugins;
