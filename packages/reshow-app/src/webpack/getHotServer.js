const getHotServer = ({ confs, path }) => ({
  host: "0.0.0.0",
  allowedHosts: "all",
  port: confs.hotPort ?? 8080,
  liveReload: false,
  hot: 'only',
  devMiddleware: {
    publicPath: confs.assetsRoot || "",
    writeToDisk: true,
  },
});

export default getHotServer;
