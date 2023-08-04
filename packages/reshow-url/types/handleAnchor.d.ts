export default handleAnchor;
/**
 * @param {string} anchor
 * @returns {function(number?)}
 */
export function goToAnchor(anchor: string): (arg0: number | null) => any;
/**
 * @param {string} path
 * @returns {function():string}
 */
export function disableHandleAnchor(path: string): () => string;
/**
 * @param {string=} path
 * @returns {AnchorPathType}
 */
export function getAnchorPath(path?: string | undefined): AnchorPathType;
/**
 * @param {string} rawPath
 * @returns {function(number?):string}
 */
declare function handleAnchor(rawPath: string): (arg0: number | null) => string;
declare class AnchorPathType {
    /**
     * @type string
     */
    anchor: string;
    /**
     * @type string
     */
    path: string;
    /**
     * @type string[]
     */
    anchorArr: string[];
    /**
     * @type string
     */
    lastAnchor: string;
}
