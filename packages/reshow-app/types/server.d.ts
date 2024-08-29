export default server;
declare function server(app: any, renderTo?: string): ({ process, fs, JSON, Buffer }: {
    process: any;
    fs: any;
    JSON: any;
    Buffer: any;
}) => void;
