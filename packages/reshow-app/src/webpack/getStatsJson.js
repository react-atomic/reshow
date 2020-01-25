import {StatsWriterPlugin} from 'webpack-stats-plugin';
import get from 'get-object-value';
const keys = Object.keys;

const getStatsJson = () => {
  // https://github.com/FormidableLabs/webpack-stats-plugin
  return new StatsWriterPlugin({
    filename: 'stats.json',
    transform(data, opts) {
      const files = get(data, ['assetsByChunkName']);
      const {hash, outputOptions} = get(opts, ['compiler'], {});
      const publicPath = outputOptions?.publicPath;
      const chunks = {};
      keys(files).forEach(key => {
        const name = files[key][0];
        chunks[key] = [
          {
            name,
            publicPath: publicPath + name + '?' + hash,
          },
        ];
      });
      return JSON.stringify({chunks, publicPath, status: 'done'}, null, 2);
    },
  });
};

export default getStatsJson;
