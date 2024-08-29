export default getEntry;
export type GetEntryProps = {
    main: {
        [x: string]: string;
    };
    root: string;
    server?: boolean | undefined;
};
/**
 * @typedef {object} GetEntryProps
 * @property {Object<string,string>} main
 * @property {string} root
 * @property {boolean=} server
 */
/**
 * @param {GetEntryProps} props
 */
declare function getEntry({ main, root, server }: GetEntryProps): {};
