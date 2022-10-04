export default Return;
declare function Return(props: any): JSX.Element;
declare namespace Return {
    export { displayName };
}
export function getReturn({ displayName, useConnect, cleanProps, options, }?: {
    displayName?: string;
    useConnect: any;
    cleanProps: any;
    options: any;
}): {
    (props: any): JSX.Element;
    displayName: string;
};
