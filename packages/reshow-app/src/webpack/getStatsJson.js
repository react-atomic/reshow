import { StatsWriterPlugin } from "webpack-stats-plugin";
import get from "get-object-value";
import { resolve } from "path";
import { KEYS, IS_ARRAY } from "reshow-constant";

const getStatsJson = ({ assetsStore, path }) => {
  // https://github.com/FormidableLabs/webpack-stats-plugin
  return new StatsWriterPlugin({
    filename: "stats.json",
    transform(data, opts) {
      const files = get(data, ["assetsByChunkName"]);
      const { hash, outputOptions } = get(opts, ["compiler"], {});
      const publicPath = outputOptions?.publicPath;
      const chunks = {};
      const assets = {};
      KEYS(files).forEach((key) => {
        const name = IS_ARRAY(files[key]) ? files[key][0] : files[key];
        chunks[key] = [name];
        assets[name] = {
          name,
          publicPath: publicPath + name + "?" + hash.substring(0, 7),
          path: resolve(path, name),
        };
      });
      assetsStore.current = { chunks, assets, publicPath, status: "done" };
      return JSON.stringify(assetsStore.current, null, 2);
    },
  });
};

export default getStatsJson;
