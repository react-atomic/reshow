const getDevServer = ({ confs, path }) => ({
  host: "0.0.0.0",
  allowedHosts: "all",
  port: confs.hotPort ?? 8080,
  liveReload: false,
  hot: true,
  devMiddleware: {
    publicPath: confs.assetsRoot || '',
    writeToDisk: true,
  }
});

export default getDevServer;
