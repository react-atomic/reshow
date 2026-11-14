import Reshow from "reshow";
import handleAnchor from "anchor-lib";
export type UrlChangeState = {
    pvid: string;
    themePath: any;
};
/**
 * @typedef {object} UrlChangeState
 * @property {string} pvid
 * @property {any} themePath
 */
/**
 * @extends {Reshow}
 */
declare class ClientRoute extends Reshow {
    /**
     * @type {any}
     */
    props: any;
    static defaultProps: {
        ajax: boolean;
        goAnchorDelay: number;
        fallback: string;
        onHashChange: typeof handleAnchor;
    };
    getPath(): any;
    /**
     * @param {string} url
     * @returns {UrlChangeState}
     */
    getUrlChangeState(url: string): UrlChangeState;
    componentDidMount(): void;
}
export default ClientRoute;
