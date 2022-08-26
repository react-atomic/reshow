const getHotServer = ({ confs, root }) => ({
  host: "0.0.0.0",
  allowedHosts: "all",
  port: confs.hotPort ?? 8080,
  liveReload: false,
  hot: "only",
  static: {
    directory: root,
  },
  devMiddleware: {
    publicPath: confs.assetsRoot || "",
    writeToDisk: true,
  },
});

export default getHotServer;
