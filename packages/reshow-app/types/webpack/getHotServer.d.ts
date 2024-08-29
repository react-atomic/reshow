export default getHotServer;
declare function getHotServer({ confs, root }: {
    confs: any;
    root: any;
}): {
    host: string;
    allowedHosts: string;
    port: any;
    liveReload: boolean;
    hot: string;
    static: {
        directory: any;
    };
    devMiddleware: {
        publicPath: any;
        writeToDisk: boolean;
    };
};
