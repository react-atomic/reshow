export default getPlugins;
/**
 * @param {object} props
 * @param {string} props.root
 * @param {string} props.path
 * @param {Function} props.stop
 * @param {string} props.mode
 * @param {string=} props.BUNDLE
 * @param {string=} props.HOT_UPDATE
 * @param {string=} props.ENABLE_SW
 * @param {boolean=} props.server
 * @param {Object<any, any>} props.confs
 */
declare function getPlugins({ root, path, stop, mode, confs, BUNDLE, HOT_UPDATE, ENABLE_SW, server, }: {
    root: string;
    path: string;
    stop: Function;
    mode: string;
    BUNDLE?: string | undefined;
    HOT_UPDATE?: string | undefined;
    ENABLE_SW?: string | undefined;
    server?: boolean | undefined;
    confs: any;
}): any[];
