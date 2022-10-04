export default ClientRoute;
declare class ClientRoute {
    static defaultProps: {
        ajax: boolean;
        goAnchorDelay: number;
        fallback: string;
        onHashChange: (rawPath: any) => (goAnchorDelay: any) => any;
    };
    getPath(): any;
    getUrlChangeState(url: any): any;
    componentDidMount(): void;
}
