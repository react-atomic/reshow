const getDevServer = ({confs, path}) => {
  return {
    port: confs.devPort || 8080, 
    publicPath: confs.assetsRoot,
    writeToDisk: true,
    liveReload: false,
    hot: true
  };
}

export default getDevServer;
