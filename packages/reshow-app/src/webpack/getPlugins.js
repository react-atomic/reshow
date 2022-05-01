import webpack from "webpack";
import chalk from "chalk";

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
const log = (s) => console.log(chalk.inverse(s));

const getPlugins = ({
  root,
  path,
  stop,
  mode,
  confs,
  BUNDLE,
  HOT_UPDATE,
  ENABLE_SW,
  server,
}) => {
  ENABLE_SW = ENABLE_SW || confs.swDebug || false;
  const processEnv = { ENABLE_SW };
  const plugins = [];
  if (root) {
    plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser.js",
        ReadableStream: require.resolve(
          root + "/node_modules/reshow-app/webpack/ReadableStream"
        ),
      })
    );
  }
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
    processEnv.NODE_ENV = PRODUCTION;
  }
  if (!server) {
    if (HOT_UPDATE) {
      log(`HOT Mode: enable, Workbox: disable.`);
      plugins.push(new Refresh());
    } else {
      if (ENABLE_SW) {
        log(`HOT Mode: disable, Workbox: enable.`);
        // get Workbox for non hot update
        plugins.push(getWorkbox(confs));
      } else {
        log(`HOT Mode: disable, Workbox: disable.`);
      }
    }
  }
  if (stop) {
    plugins.push(new FinishPlugin({ stop }));
  }
  plugins.push(
    // https://webpack.js.org/plugins/environment-plugin/
    new webpack.EnvironmentPlugin(processEnv)
  );
  return plugins;
};

export default getPlugins;
