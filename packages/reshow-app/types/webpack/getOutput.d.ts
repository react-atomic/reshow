export default getOutput;
export type GetOutputProps = {
    path: string;
    confs: {
        [x: string]: any;
    };
    server?: boolean | undefined;
};
/**
 * @typedef {object} GetOutputProps
 * @property {string} path
 * @property {Object<string,any>} confs
 * @property {boolean=} server
 */
/**
 * https://webpack.js.org/configuration/output/
 * @param {GetOutputProps} props
 */
declare function getOutput({ path, confs, server }: GetOutputProps): {
    filename: string;
    path: string;
    publicPath: any;
};
