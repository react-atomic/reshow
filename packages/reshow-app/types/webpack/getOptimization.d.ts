export default getOptimization;
/**
 * @param {object} props
 * @param {string} props.mode
 * @param {boolean=} props.server
 * @param {Object<any, any>} props.confs
 */
declare function getOptimization({ mode, server, confs }: {
    mode: string;
    server?: boolean | undefined;
    confs: any;
}): {
    chunkIds: string;
    moduleIds: string;
    usedExports: string;
    removeAvailableModules: boolean;
};
