export default ClientRoute;
/**
 * @extends {Reshow}
 */
declare class ClientRoute extends Reshow {
    static defaultProps: {
        ajax: boolean;
        goAnchorDelay: number;
        fallback: string;
        onHashChange: typeof handleAnchor;
    };
    getPath(): any;
    /**
     * @param {string} url
     * @returns {Object}
     */
    getUrlChangeState(url: string): any;
}
import Reshow from "reshow";
import handleAnchor from "anchor-lib";
