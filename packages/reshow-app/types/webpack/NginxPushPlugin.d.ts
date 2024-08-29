export default NginxPushPlugin;
declare class NginxPushPlugin {
    constructor(options: any, assetsStore: any);
    options: any;
    assetsStore: any;
    apply(compiler: any): void;
    resetFilename(): void;
    emitStats(compilation: any, callback: any): Promise<any>;
    getNginxConf(assets: any): string;
}
