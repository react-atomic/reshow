const getDevServer = ({ confs, path }) => ({
  host: "0.0.0.0",
  disableHostCheck: true,
  port: confs.hotPort ?? 8080,
  publicPath: confs.assetsRoot || '',
  writeToDisk: true,
  liveReload: false,
  hot: true,
});

export default getDevServer;
